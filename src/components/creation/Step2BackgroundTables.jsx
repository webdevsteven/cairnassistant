import { useState } from 'react'
import { getBackgroundById } from '../../data/backgrounds'
import { rollD6 } from '../../utils/dice'

function parseContainerSlots(name) {
  const m = name.match(/\+(\d+)\s+slots?/i)
  return m ? parseInt(m[1], 10) : 0
}

function isGoldEntry(name) {
  return /^\d+d\d+\s+Gold\s+Pieces$/i.test(name)
}

function buildInventoryItem(name) {
  return {
    id: crypto.randomUUID(),
    name,
    slots: name.toLowerCase().includes('bulky') ? 2 : 1,
    isFatigue: false,
    isPetty: name.toLowerCase().includes('petty'),
    notes: ''
  }
}

export default function Step2BackgroundTables({ draft, setDraft }) {
  const bg = getBackgroundById(draft.background)
  const [rolling1, setRolling1] = useState(false)
  const [rolling2, setRolling2] = useState(false)

  if (!bg) return <div style={{ padding: 16, color: '#78716c' }}>No background selected.</div>

  const c = draft.backgroundChoices || { table1: null, table2: null }

  function roll(tableNum) {
    const setter = tableNum === 1 ? setRolling1 : setRolling2
    setter(true)
    setTimeout(() => {
      const result = rollD6()
      selectEntry(tableNum, result)
      setter(false)
    }, 350)
  }

  function selectEntry(tableNum, rollVal) {
    const table = tableNum === 1 ? bg.table1 : bg.table2
    const entry = table.entries.find(e => e.roll === rollVal)
    if (!entry) return

    setDraft(prev => {
      const newChoices = { ...prev.backgroundChoices, [`table${tableNum}`]: rollVal }

      const t1Entry = tableNum === 1 ? entry : (bg.table1.entries.find(e => e.roll === prev.backgroundChoices?.table1))
      const t2Entry = tableNum === 2 ? entry : (bg.table2.entries.find(e => e.roll === prev.backgroundChoices?.table2))

      const tableItemNames = [
        ...(t1Entry?.items || []),
        ...(t2Entry?.items || [])
      ]

      // Combine starting gear + table items, filtering gold entries and container-only entries
      const allGearNames = [
        ...bg.startingGear,
        ...tableItemNames
      ]

      const containers = []
      const inventoryItems = []

      allGearNames.forEach(name => {
        if (isGoldEntry(name)) return // handled separately
        const slotBonus = parseContainerSlots(name)
        if (slotBonus > 0) {
          // This item is a container — create a container card
          containers.push({
            id: crypto.randomUUID(),
            name,
            maxSlots: slotBonus,
            items: []
          })
          // Also add a reference item in inventory if it has bulk (e.g. Backpack is standard, others may not be)
          // Backpack is already handled as "Backpack" from startingGear — skip adding containers as inventory items
          return
        }
        inventoryItems.push(buildInventoryItem(name))
      })

      // Special flags from table entries
      const requiresExtraBond = prev.requiresExtraBond ||
        (t1Entry?.rollBonds) || (t2Entry?.rollBonds) || false
      const requiresExtraOmen = prev.requiresExtraOmen ||
        (t1Entry?.rollOmens) || (t2Entry?.rollOmens) || false

      const descriptions = {
        table1: tableNum === 1
          ? { question: bg.table1.question, text: entry.text }
          : (prev.backgroundTableDescriptions?.table1 || { question: bg.table1.question, text: '' }),
        table2: tableNum === 2
          ? { question: bg.table2.question, text: entry.text }
          : (prev.backgroundTableDescriptions?.table2 || { question: bg.table2.question, text: '' }),
      }

      return {
        ...prev,
        backgroundChoices: newChoices,
        backgroundItems: tableItemNames,
        inventory: inventoryItems,
        containers,
        backgroundTableDescriptions: descriptions,
        requiresExtraBond,
        requiresExtraOmen,
      }
    })
  }

  function EntryCard({ entry, selected, onSelect }) {
    return (
      <button
        onClick={() => onSelect(entry.roll)}
        style={{
          background: selected ? '#1c1917' : 'transparent',
          border: `1.5px solid ${selected ? '#d97706' : '#292524'}`,
          borderRadius: 10,
          padding: '12px 14px',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          transition: 'border-color 0.15s, background 0.15s'
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{
            fontSize: 12, fontWeight: 800, color: selected ? '#f59e0b' : '#57534e',
            background: '#0c0a09', padding: '2px 7px', borderRadius: 5,
            flexShrink: 0, marginTop: 1, minWidth: 20, textAlign: 'center'
          }}>
            {entry.roll}
          </span>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: selected ? '#e7e5e4' : '#a8a29e', lineHeight: 1.5 }}>
              {entry.text}
            </p>
            {selected && entry.items.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {entry.items.filter(i => !isGoldEntry(i)).map((item, i) => (
                  <span key={i} style={{
                    fontSize: 11, color: parseContainerSlots(item) > 0 ? '#818cf8' : '#d97706',
                    background: parseContainerSlots(item) > 0 ? '#1e1b4b' : '#1c0a00',
                    padding: '2px 7px', borderRadius: 5
                  }}>
                    {parseContainerSlots(item) > 0 ? '📦' : '+'} {item}
                  </span>
                ))}
              </div>
            )}
            {selected && (entry.rollBonds || entry.rollOmens) && (
              <div style={{ marginTop: 6, fontSize: 11, color: '#a78bfa', fontStyle: 'italic' }}>
                ✦ {entry.rollBonds ? 'Roll an extra Bond in Step 6' : 'Roll on the Omens table in Step 7'}
              </div>
            )}
          </div>
        </div>
      </button>
    )
  }

  function TableSection({ table, tableNum, rolling, value, onRoll }) {
    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#e7e5e4' }}>
            {table.question}
          </h3>
          <button
            onClick={onRoll}
            disabled={rolling}
            style={{
              padding: '7px 14px', background: rolling ? '#292524' : '#1c1917',
              border: `1px solid ${rolling ? '#44403c' : '#d97706'}`,
              borderRadius: 8, color: rolling ? '#78716c' : '#d97706',
              fontSize: 13, fontWeight: 700, cursor: rolling ? 'default' : 'pointer',
              flexShrink: 0, transition: 'all 0.2s'
            }}
          >
            {rolling ? '…' : '🎲 Roll'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {table.entries.map(entry => (
            <EntryCard
              key={entry.roll}
              entry={entry}
              selected={value === entry.roll}
              onSelect={(r) => selectEntry(tableNum, r)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Roll or choose your results from the two <strong style={{ color: '#d97706' }}>{bg.name}</strong> tables. Your choices grant unique items and abilities.
      </p>

      {bg.specialRule && (
        <div style={{ padding: '10px 14px', background: '#1c0a00', border: '1px solid #7c2d12', borderRadius: 10, marginBottom: 16, fontSize: 13, color: '#fcd34d' }}>
          ⚠ Special: {bg.specialRule}
        </div>
      )}

      <TableSection table={bg.table1} tableNum={1} rolling={rolling1} value={c.table1} onRoll={() => roll(1)} />
      <TableSection table={bg.table2} tableNum={2} rolling={rolling2} value={c.table2} onRoll={() => roll(2)} />

      {c.table1 !== null && c.table2 !== null && (
        <div style={{ padding: '12px 14px', background: '#0c1a0c', border: '1px solid #166534', borderRadius: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Starting Inventory Preview
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {draft.inventory?.map((item, i) => (
              <span key={i} style={{
                fontSize: 11, color: '#86efac', background: '#052e16', padding: '3px 8px', borderRadius: 6
              }}>{item.name}</span>
            ))}
            {draft.containers?.map((c, i) => (
              <span key={`c${i}`} style={{
                fontSize: 11, color: '#818cf8', background: '#1e1b4b', padding: '3px 8px', borderRadius: 6
              }}>📦 {c.name}</span>
            ))}
          </div>
          {(draft.requiresExtraBond || draft.requiresExtraOmen) && (
            <div style={{ marginTop: 8, fontSize: 11, color: '#a78bfa' }}>
              ✦ {draft.requiresExtraBond ? 'You will roll a second Bond' : 'You will roll on the Omens table'} due to a special ability
            </div>
          )}
        </div>
      )}
    </div>
  )
}
