import { useState, useCallback } from 'react'
import { marketplace } from '../data/marketplace'
import { useCharacters } from '../hooks/useCharacters'

const CATEGORIES = [
  { key: 'all',       label: 'All',      icon: '🛒' },
  { key: 'armor',     label: 'Armor',    icon: '🛡' },
  { key: 'weapons',   label: 'Weapons',  icon: '⚔️' },
  { key: 'gear',      label: 'Gear',     icon: '🎒' },
  { key: 'transport', label: 'Travel',   icon: '🐴' },
  { key: 'upkeep',    label: 'Upkeep',   icon: '🏠' },
  { key: 'hirelings', label: 'Hire',     icon: '👥' },
]

function parseItemProps(name) {
  const lower = name.toLowerCase()
  return {
    isPetty: lower.includes('petty'),
    slots: lower.includes('bulky') ? 2 : 1,
  }
}

// Returns extra container slots if item is a mount/vehicle, else 0
function parseContainerSlots(name) {
  const m = name.match(/\+(\d+)\s*slots?/i)
  return m ? parseInt(m[1], 10) : 0
}

// Returns armor bonus for armor items, else 0
function parseArmorBonus(name) {
  const addM = name.match(/\+(\d+)\s*armor/i)
  if (addM) return parseInt(addM[1], 10)
  const setM = name.match(/\b(\d+)\s*armor/i)
  if (setM) return parseInt(setM[1], 10)
  return 0
}

function usedInventorySlots(character) {
  return (character.inventory || [])
    .filter(i => !i.isPetty)
    .reduce((sum, i) => sum + (i.slots || 1), 0)
}

function findMarketPrice(itemName) {
  for (const items of Object.values(marketplace)) {
    const match = items.find(m => m.name === itemName)
    if (match) return match.gp
  }
  return null
}

// ── Sell row ──────────────────────────────────────────────────────────────────
function SellRow({ item, label, onSell }) {
  const [confirming, setConfirming] = useState(false)
  const marketPrice = findMarketPrice(item.name)
  const defaultPrice = marketPrice ? Math.max(1, Math.floor(marketPrice * 0.5)) : 5
  const [price, setPrice] = useState(defaultPrice)

  if (confirming) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px', background: '#1c1917',
        border: '1px solid #44403c', borderRadius: 10,
      }}>
        <span style={{ flex: 1, fontSize: 13, color: '#e7e5e4', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <input
            type="number" min={0} value={price}
            onChange={e => setPrice(Math.max(0, parseInt(e.target.value, 10) || 0))}
            style={{ width: 56, padding: '6px 8px', textAlign: 'center', background: '#0c0a09', border: '1px solid #44403c', borderRadius: 8, color: '#fbbf24', fontWeight: 700, fontSize: 14, outline: 'none' }}
          />
          <span style={{ fontSize: 12, color: '#78716c' }}>gp</span>
        </div>
        <button onClick={() => { onSell(item, price); setConfirming(false) }}
          style={{ padding: '6px 12px', background: '#16a34a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>✓</button>
        <button onClick={() => setConfirming(false)}
          style={{ padding: '6px 10px', background: 'transparent', border: '1px solid #292524', borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>✕</button>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', background: '#1c1917',
      border: '1px solid #292524', borderRadius: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e7e5e4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
          {label && <span style={{ fontSize: 10, color: '#57534e', fontWeight: 600 }}>{label}</span>}
          {item.isFatigue && <span style={{ fontSize: 10, color: '#ca8a04', fontWeight: 600 }}>FATIGUE</span>}
          {item.isPetty  && <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600 }}>PETTY</span>}
          {item.slots === 2 && !item.maxSlots && <span style={{ fontSize: 10, color: '#a8a29e', fontWeight: 600 }}>BULKY</span>}
          {item.maxSlots && <span style={{ fontSize: 10, color: '#a8a29e', fontWeight: 600 }}>{item.maxSlots} SLOTS</span>}
          {marketPrice && !item.maxSlots && (
            <span style={{ fontSize: 10, color: '#78716c' }}>
              market {marketPrice}gp → ~{Math.floor(marketPrice * 0.5)}gp
            </span>
          )}
        </div>
      </div>
      <button onClick={() => { setPrice(defaultPrice); setConfirming(true) }}
        style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #44403c', borderRadius: 8, color: '#a8a29e', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
        Sell
      </button>
    </div>
  )
}

// ── Buy card ──────────────────────────────────────────────────────────────────
function BuyCard({ item, category, character, onBuy, justBought }) {
  const { isPetty, slots } = parseItemProps(item.name)
  const containerSlots = parseContainerSlots(item.name)
  const armorBonus     = containerSlots === 0 ? parseArmorBonus(item.name) : 0
  const isContainer    = containerSlots > 0

  const used = usedInventorySlots(character)
  const canAfford = character.gold >= item.gp
  const hasSpace  = isContainer || isPetty || (used + slots <= 10)
  const canBuy    = canAfford && hasSpace

  let hint = ''
  if (!canAfford) hint = 'Not enough gold'
  else if (!hasSpace) hint = 'Inventory full'

  return (
    <div style={{
      padding: '12px 14px',
      background: justBought ? '#052e16' : '#1c1917',
      border: `1px solid ${justBought ? '#16a34a' : '#292524'}`,
      borderRadius: 12,
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#e7e5e4', lineHeight: 1.35 }}>
            {item.name}
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: '#78716c', textTransform: 'uppercase' }}>
              {CATEGORIES.find(c => c.key === category)?.label}
            </span>
            {isPetty && <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600 }}>· Petty</span>}
            {slots === 2 && !isContainer && <span style={{ fontSize: 10, color: '#a8a29e', fontWeight: 600 }}>· Bulky (2 slots)</span>}

            {/* Container badge */}
            {isContainer && (
              <span style={{ fontSize: 10, fontWeight: 700, background: '#1e3a5f', color: '#93c5fd', padding: '2px 7px', borderRadius: 5 }}>
                🐴 +{containerSlots} extra slots
              </span>
            )}
            {/* Armor badge */}
            {armorBonus > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, background: '#1c1a05', color: '#fde68a', padding: '2px 7px', borderRadius: 5 }}>
                🛡 +{armorBonus} armor
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#fbbf24' }}>
            {item.gp} <span style={{ fontSize: 12, fontWeight: 600, color: '#78716c' }}>gp</span>
          </span>
          <button
            onClick={() => canBuy && onBuy(item, { isPetty, slots, containerSlots, armorBonus })}
            disabled={!canBuy}
            title={hint}
            style={{
              padding: '7px 14px',
              background: canBuy ? '#d97706' : '#1c1917',
              border: `1px solid ${canBuy ? 'transparent' : '#292524'}`,
              borderRadius: 8,
              color: canBuy ? '#1c1917' : '#44403c',
              fontSize: 13, fontWeight: 700, cursor: canBuy ? 'pointer' : 'default',
              transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}
          >
            {justBought ? '✓ Done' : 'Buy'}
          </button>
          {hint && <span style={{ fontSize: 10, color: '#ef4444' }}>{hint}</span>}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const { characters, save } = useCharacters()
  const sorted = [...characters].sort((a, b) => b.updatedAt - a.updatedAt)

  const [selectedId, setSelectedId] = useState(sorted[0]?.id || null)
  const [tab, setTab]               = useState('buy')
  const [category, setCategory]     = useState('all')
  const [recentBuys, setRecentBuys] = useState({})
  const [toast, setToast]           = useState(null)

  const character = sorted.find(c => c.id === selectedId) || null

  function showToast(msg, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 2800)
  }

  const handleBuy = useCallback((item, { isPetty, slots, containerSlots, armorBonus }) => {
    if (!character) return

    const updates = { gold: character.gold - item.gp }
    const lines = [`Bought ${item.name} for ${item.gp}gp`]

    if (containerSlots > 0) {
      // Mount / vehicle → create a named container card
      const newContainer = { id: crypto.randomUUID(), name: item.name, maxSlots: containerSlots, items: [] }
      updates.containers = [...(character.containers || []), newContainer]
      lines.push(`Container added to your sheet (+${containerSlots} slots)`)
    } else {
      // Regular item → add to inventory
      const newItem = { id: crypto.randomUUID(), name: item.name, slots, isPetty, isFatigue: false, notes: '' }
      updates.inventory = [...(character.inventory || []), newItem]

      if (armorBonus > 0) {
        const newArmor = Math.min(3, (character.armor || 0) + armorBonus)
        updates.armor = newArmor
        lines.push(`Armor updated: ${character.armor || 0} → ${newArmor}`)
      }
    }

    save({ ...character, ...updates })

    setRecentBuys(prev => ({ ...prev, [item.name]: Date.now() }))
    setTimeout(() => setRecentBuys(prev => { const n = { ...prev }; delete n[item.name]; return n }), 2000)
    showToast(lines.join(' — '))
  }, [character, save])

  const handleSellInventory = useCallback((invItem, price) => {
    if (!character) return
    save({
      ...character,
      gold: character.gold + price,
      inventory: (character.inventory || []).filter(i => i.id !== invItem.id),
    })
    showToast(`Sold ${invItem.name} for ${price}gp`)
  }, [character, save])

  const handleSellContainer = useCallback((container, price) => {
    if (!character) return
    save({
      ...character,
      gold: character.gold + price,
      containers: (character.containers || []).filter(c => c.id !== container.id),
    })
    showToast(`Sold ${container.name} for ${price}gp`)
  }, [character, save])

  const allItems = Object.entries(marketplace).flatMap(([cat, items]) =>
    items.map(item => ({ ...item, category: cat }))
  )
  const visibleItems = category === 'all' ? allItems : allItems.filter(i => i.category === category)

  const sellableInventory  = (character?.inventory  || []).filter(i => !i.isFatigue)
  const sellableContainers = (character?.containers  || [])

  const usedSlots = character ? usedInventorySlots(character) : 0

  return (
    <div style={{ minHeight: '100%', background: '#0c0a09' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, left: 16, right: 16,
          zIndex: 100, background: '#14532d',
          border: '1px solid #16a34a', borderRadius: 12,
          padding: '10px 16px', color: '#fff', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)', pointerEvents: 'none',
          lineHeight: 1.5, animation: 'fadeIn 0.2s ease'
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#0c0a09', borderBottom: '1px solid #1c1917',
        padding: '16px 16px 0',
      }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#e7e5e4', letterSpacing: '-0.02em' }}>Shop</h1>

        {sorted.length === 0 ? (
          <p style={{ margin: '0 0 12px', fontSize: 14, color: '#57534e' }}>No characters yet. Create one first.</p>
        ) : (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Shopping for</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {sorted.map(c => (
                <button key={c.id} onClick={() => setSelectedId(c.id)}
                  style={{
                    flexShrink: 0, padding: '7px 14px',
                    background: selectedId === c.id ? '#292524' : 'transparent',
                    border: `1px solid ${selectedId === c.id ? '#d97706' : '#292524'}`,
                    borderRadius: 10,
                    color: selectedId === c.id ? '#f59e0b' : '#78716c',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer'
                  }}>
                  {c.name || 'Unnamed'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gold + slots bar */}
        {character && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, padding: '10px 14px', background: '#1c1917', borderRadius: 10, border: '1px solid #292524' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Gold</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>{character.gold ?? 0} gp</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Body Slots</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: usedSlots >= 10 ? '#ef4444' : '#e7e5e4' }}>
                {usedSlots}<span style={{ fontSize: 13, color: '#57534e', fontWeight: 500 }}>/10</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Armor</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#e7e5e4' }}>
                {character.armor ?? 0}<span style={{ fontSize: 13, color: '#57534e', fontWeight: 500 }}>/3</span>
              </div>
            </div>
          </div>
        )}

        {/* Buy / Sell tabs */}
        {character && (
          <div style={{ display: 'flex', borderBottom: '1px solid #292524' }}>
            {['buy', 'sell'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px 0',
                  background: 'none', border: 'none',
                  borderBottom: tab === t ? '2px solid #d97706' : '2px solid transparent',
                  color: tab === t ? '#f59e0b' : '#78716c',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  textTransform: 'capitalize', marginBottom: -1, transition: 'color 0.15s'
                }}>
                {t === 'buy' ? '🛒 Buy' : '💰 Sell'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {!character ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#57534e', fontSize: 15 }}>
          Select a character above to start shopping.
        </div>
      ) : tab === 'buy' ? (
        <div>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 14px 8px', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setCategory(cat.key)}
                style={{
                  flexShrink: 0, padding: '6px 14px',
                  background: category === cat.key ? '#292524' : 'transparent',
                  border: `1px solid ${category === cat.key ? '#d97706' : '#292524'}`,
                  borderRadius: 20,
                  color: category === cat.key ? '#f59e0b' : '#78716c',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s'
                }}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '4px 14px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {visibleItems.map((item, idx) => (
              <BuyCard
                key={`${item.category}-${idx}`}
                item={item}
                category={item.category}
                character={character}
                onBuy={handleBuy}
                justBought={!!recentBuys[item.name]}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '12px 14px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Containers for sale */}
          {sellableContainers.length > 0 && (
            <>
              <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                Mounts & Vehicles
              </div>
              {sellableContainers.map(c => (
                <SellRow
                  key={c.id}
                  item={{ ...c, name: c.name }}
                  label={`Container · ${c.maxSlots} slots`}
                  onSell={handleSellContainer}
                />
              ))}
              {sellableInventory.length > 0 && (
                <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '4px 0 2px' }}>
                  Inventory
                </div>
              )}
            </>
          )}

          {/* Inventory for sale */}
          {sellableInventory.length === 0 && sellableContainers.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#57534e', fontSize: 14 }}>
              No items to sell.
            </div>
          ) : (
            <>
              {sellableInventory.length > 0 && (
                <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                  {sellableInventory.length} item{sellableInventory.length !== 1 ? 's' : ''} — tap Sell to set price
                </div>
              )}
              {sellableInventory.map(item => (
                <SellRow key={item.id} item={item} onSell={handleSellInventory} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
