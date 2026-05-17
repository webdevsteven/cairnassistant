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

// ── Sell row (inline confirm) ────────────────────────────────────────────────
function SellRow({ item, onSell }) {
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
        <span style={{ flex: 1, fontSize: 13, color: '#e7e5e4', fontWeight: 600 }}>{item.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="number"
            min={0}
            value={price}
            onChange={e => setPrice(Math.max(0, parseInt(e.target.value, 10) || 0))}
            style={{
              width: 60, padding: '6px 8px', textAlign: 'center',
              background: '#0c0a09', border: '1px solid #44403c',
              borderRadius: 8, color: '#fbbf24', fontWeight: 700,
              fontSize: 14, outline: 'none'
            }}
          />
          <span style={{ fontSize: 12, color: '#78716c' }}>gp</span>
        </div>
        <button
          onClick={() => { onSell(item, price); setConfirming(false) }}
          style={{
            padding: '6px 12px', background: '#16a34a', border: 'none',
            borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}
        >✓</button>
        <button
          onClick={() => setConfirming(false)}
          style={{
            padding: '6px 10px', background: 'transparent', border: '1px solid #292524',
            borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer'
          }}
        >✕</button>
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
        <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
          {item.isFatigue && <span style={{ fontSize: 10, color: '#ca8a04', fontWeight: 600 }}>FATIGUE</span>}
          {item.isPetty  && <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600 }}>PETTY</span>}
          {item.slots === 2 && <span style={{ fontSize: 10, color: '#a8a29e', fontWeight: 600 }}>BULKY</span>}
          {marketPrice && (
            <span style={{ fontSize: 10, color: '#78716c' }}>
              market {marketPrice}gp → sell ~{Math.floor(marketPrice * 0.5)}gp
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => { setPrice(defaultPrice); setConfirming(true) }}
        style={{
          padding: '6px 14px', background: 'transparent',
          border: '1px solid #44403c', borderRadius: 8,
          color: '#a8a29e', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
      >
        Sell
      </button>
    </div>
  )
}

// ── Buy card ─────────────────────────────────────────────────────────────────
function BuyCard({ item, category, character, onBuy, justBought }) {
  const { isPetty, slots } = parseItemProps(item.name)
  const used = usedInventorySlots(character)
  const canAfford = character.gold >= item.gp
  const hasSpace = isPetty || (used + slots <= 10)
  const canBuy = canAfford && hasSpace

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
          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
              color: '#78716c', textTransform: 'uppercase'
            }}>
              {CATEGORIES.find(c => c.key === category)?.label}
            </span>
            {isPetty && <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600 }}>· Petty</span>}
            {slots === 2 && <span style={{ fontSize: 10, color: '#a8a29e', fontWeight: 600 }}>· Bulky (2 slots)</span>}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#fbbf24' }}>
            {item.gp} <span style={{ fontSize: 12, fontWeight: 600, color: '#78716c' }}>gp</span>
          </span>
          <button
            onClick={() => canBuy && onBuy(item, { isPetty, slots })}
            disabled={!canBuy}
            title={hint}
            style={{
              padding: '7px 14px',
              background: canBuy ? '#d97706' : '#1c1917',
              border: `1px solid ${canBuy ? 'transparent' : '#292524'}`,
              borderRadius: 8,
              color: canBuy ? '#1c1917' : '#44403c',
              fontSize: 13, fontWeight: 700, cursor: canBuy ? 'pointer' : 'default',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {justBought ? '✓ Bought' : 'Buy'}
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
    setTimeout(() => setToast(null), 2200)
  }

  const handleBuy = useCallback((item, { isPetty, slots }) => {
    if (!character) return
    const newItem = {
      id: crypto.randomUUID(),
      name: item.name,
      slots,
      isPetty,
      isFatigue: false,
      notes: '',
    }
    save({
      ...character,
      gold: character.gold - item.gp,
      inventory: [...(character.inventory || []), newItem],
    })
    setRecentBuys(prev => ({ ...prev, [item.name]: Date.now() }))
    setTimeout(() => setRecentBuys(prev => { const n = {...prev}; delete n[item.name]; return n }), 2000)
    showToast(`Bought ${item.name} for ${item.gp}gp`)
  }, [character, save])

  const handleSell = useCallback((invItem, price) => {
    if (!character) return
    save({
      ...character,
      gold: character.gold + price,
      inventory: (character.inventory || []).filter(i => i.id !== invItem.id),
    })
    showToast(`Sold ${invItem.name} for ${price}gp`)
  }, [character, save])

  // Flatten marketplace items for buy tab
  const allItems = Object.entries(marketplace).flatMap(([cat, items]) =>
    items.map(item => ({ ...item, category: cat }))
  )
  const visibleItems = category === 'all' ? allItems : allItems.filter(i => i.category === category)

  // Sellable inventory: everything except fatigue
  const sellableInventory = (character?.inventory || []).filter(i => !i.isFatigue)

  const usedSlots = character ? usedInventorySlots(character) : 0

  return (
    <div style={{ minHeight: '100%', background: '#0c0a09' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, background: toast.ok ? '#14532d' : '#7f1d1d',
          border: `1px solid ${toast.ok ? '#16a34a' : '#dc2626'}`,
          borderRadius: 12, padding: '10px 20px',
          color: '#fff', fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          animation: 'fadeIn 0.2s ease'
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
        <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#e7e5e4', letterSpacing: '-0.02em' }}>
          Shop
        </h1>

        {/* Character selector */}
        {sorted.length === 0 ? (
          <p style={{ margin: '0 0 12px', fontSize: 14, color: '#57534e' }}>No characters yet. Create one first.</p>
        ) : (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Shopping for
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {sorted.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    flexShrink: 0,
                    padding: '7px 14px',
                    background: selectedId === c.id ? '#292524' : 'transparent',
                    border: `1px solid ${selectedId === c.id ? '#d97706' : '#292524'}`,
                    borderRadius: 10,
                    color: selectedId === c.id ? '#f59e0b' : '#78716c',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {c.name || 'Unnamed'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gold + slot info bar */}
        {character && (
          <div style={{
            display: 'flex', gap: 12, marginBottom: 12,
            padding: '10px 14px', background: '#1c1917',
            borderRadius: 10, border: '1px solid #292524',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Gold</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>{character.gold ?? 0} gp</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Inventory</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: usedSlots >= 10 ? '#ef4444' : '#e7e5e4' }}>
                {usedSlots}<span style={{ fontSize: 13, color: '#57534e', fontWeight: 500 }}>/10</span>
              </div>
            </div>
          </div>
        )}

        {/* Buy / Sell tabs */}
        {character && (
          <div style={{ display: 'flex', borderBottom: '1px solid #292524' }}>
            {['buy', 'sell'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px 0',
                  background: 'none', border: 'none',
                  borderBottom: tab === t ? '2px solid #d97706' : '2px solid transparent',
                  color: tab === t ? '#f59e0b' : '#78716c',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  textTransform: 'capitalize', marginBottom: -1,
                  transition: 'color 0.15s'
                }}
              >
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
          <div style={{
            display: 'flex', gap: 8, overflowX: 'auto',
            padding: '12px 14px 8px', scrollbarWidth: 'none'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  background: category === cat.key ? '#292524' : 'transparent',
                  border: `1px solid ${category === cat.key ? '#d97706' : '#292524'}`,
                  borderRadius: 20,
                  color: category === cat.key ? '#f59e0b' : '#78716c',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Item list */}
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
          {sellableInventory.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#57534e', fontSize: 14 }}>
              No items to sell.
            </div>
          ) : (
            <>
              <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {sellableInventory.length} items — tap Sell to set price and confirm
              </div>
              {sellableInventory.map(item => (
                <SellRow key={item.id} item={item} onSell={handleSell} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
