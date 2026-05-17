import { useState } from 'react'
import { getBackgroundById } from '../../data/backgrounds'
import { rollD6 } from '../../utils/dice'

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

  function selectEntry(tableNum, roll) {
    const table = tableNum === 1 ? bg.table1 : bg.table2
    const entry = table.entries.find(e => e.roll === roll)
    if (!entry) return

    setDraft(prev => {
      const newChoices = { ...prev.backgroundChoices, [`table${tableNum}`]: roll }
      // Collect all items from both table choices
      const t1Entry = tableNum === 1 ? entry : (bg.table1.entries.find(e => e.roll === prev.backgroundChoices?.table1))
      const t2Entry = tableNum === 2 ? entry : (bg.table2.entries.find(e => e.roll === prev.backgroundChoices?.table2))

      const tableItems = [
        ...(t1Entry?.items || []),
        ...(t2Entry?.items || [])
      ]

      const allItems = [
        ...bg.startingGear.map(name => ({
          id: crypto.randomUUID(), name, slots: 1,
          isFatigue: false, isPetty: name.toLowerCase().includes('petty'), notes: ''
        })),
        ...tableItems.map(name => ({
          id: crypto.randomUUID(), name, slots: 1,
          isFatigue: false, isPetty: name.toLowerCase().includes('petty'), notes: ''
        }))
      ]

      return { ...prev, backgroundChoices: newChoices, backgroundItems: tableItems, inventory: allItems }
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
                {entry.items.map((item, i) => (
                  <span key={i} style={{
                    fontSize: 11, color: '#d97706',
                    background: '#1c0a00', padding: '2px 7px', borderRadius: 5
                  }}>+ {item}</span>
                ))}
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
          </div>
        </div>
      )}
    </div>
  )
}
