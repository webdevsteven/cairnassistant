import { useState } from 'react'
import { backgrounds } from '../../data/backgrounds'
import { rollD20 } from '../../utils/dice'

export default function Step1Background({ draft, setDraft }) {
  const [search, setSearch] = useState('')
  const [rolling, setRolling] = useState(false)

  const filtered = backgrounds.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase())
  )

  function handleSelect(bg) {
    setDraft(prev => ({
      ...prev,
      background: bg.id,
      backgroundName: bg.name,
      backgroundChoices: { table1: null, table2: null },
      backgroundItems: [],
      inventory: [],
    }))
  }

  function handleRoll() {
    setRolling(true)
    setTimeout(() => {
      const idx = (rollD20() - 1) % backgrounds.length
      handleSelect(backgrounds[idx])
      setRolling(false)
    }, 400)
  }

  const selected = backgrounds.find(b => b.id === draft.background)

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Your background defines who you are and what you carry. Choose one or roll the dice.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={handleRoll}
          disabled={rolling}
          style={{
            padding: '11px 18px',
            background: rolling ? '#292524' : '#d97706',
            border: 'none',
            borderRadius: 10,
            color: rolling ? '#78716c' : '#1c1917',
            fontWeight: 700, fontSize: 15,
            cursor: rolling ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'background 0.2s',
            flexShrink: 0
          }}
        >
          🎲 {rolling ? 'Rolling…' : 'Roll d20'}
        </button>
        <input
          type="search"
          placeholder="Search backgrounds…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '11px 14px',
            background: '#1c1917', border: '1px solid #292524',
            borderRadius: 10, color: '#e7e5e4', fontSize: 15, outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((bg, i) => {
          const isSelected = draft.background === bg.id
          return (
            <button
              key={bg.id}
              onClick={() => handleSelect(bg)}
              style={{
                background: isSelected ? '#292524' : '#1c1917',
                border: `1.5px solid ${isSelected ? '#d97706' : '#292524'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
                animation: `fadeIn 0.2s ease ${Math.min(i * 0.02, 0.3)}s both`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#57534e',
                  background: '#0c0a09', padding: '2px 6px', borderRadius: 4, minWidth: 22, textAlign: 'center'
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: isSelected ? '#f59e0b' : '#e7e5e4' }}>
                  {bg.name}
                </span>
                {bg.specialRule && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#d97706', fontWeight: 600, background: '#1c0a00', padding: '2px 6px', borderRadius: 4 }}>
                    Special
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#78716c', lineHeight: 1.5, fontStyle: 'italic' }}>
                {bg.description}
              </p>
              {isSelected && bg.startingGear && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #292524' }}>
                  <div style={{ fontSize: 11, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Starting Gear</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {bg.startingGear.map((g, gi) => (
                      <span key={gi} style={{
                        fontSize: 11, color: '#a8a29e',
                        background: '#0c0a09', padding: '3px 7px', borderRadius: 6
                      }}>{g}</span>
                    ))}
                  </div>
                </div>
              )}
              {isSelected && bg.specialRule && (
                <div style={{ marginTop: 8, padding: '8px 10px', background: '#1c0a00', borderRadius: 8, fontSize: 12, color: '#d97706' }}>
                  ⚠ {bg.specialRule}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
