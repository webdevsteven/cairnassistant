import { useState } from 'react'
import { omens } from '../../data/omens'
import { rollD20 } from '../../utils/dice'
import { getBackgroundById } from '../../data/backgrounds'

export default function Step7Identity({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)
  const bg = getBackgroundById(draft.background)
  const isFoundling = draft.background === 'foundling'
  const showOmens = isFoundling || draft.showOmens

  function rollAge() {
    import('../../utils/dice').then(({ roll2d20plus10 }) => {
      const age = roll2d20plus10()
      setDraft(prev => ({ ...prev, age }))
    })
  }

  function rollOmen() {
    setRolling(true)
    setTimeout(() => {
      const omen = omens[rollD20() - 1]
      setDraft(prev => ({
        ...prev,
        omens: [omen.text]
      }))
      setRolling(false)
    }, 350)
  }

  const suggestedNames = bg?.names || []

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Give your character a name and set their age. If you are the youngest in your party, roll on the Omens table.
      </p>

      {/* Name */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Name
        </label>
        <input
          autoFocus
          type="text"
          placeholder="Enter a name…"
          value={draft.name || ''}
          onChange={e => setDraft(prev => ({ ...prev, name: e.target.value }))}
          style={{
            width: '100%', padding: '14px 16px',
            background: '#1c1917', border: '1px solid #292524',
            borderRadius: 12, color: '#e7e5e4', fontSize: 18, fontWeight: 700,
            outline: 'none', boxSizing: 'border-box'
          }}
        />
        {suggestedNames.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: '#57534e', marginBottom: 6 }}>Suggested names for {bg?.name}:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {suggestedNames.map(n => (
                <button
                  key={n}
                  onClick={() => setDraft(prev => ({ ...prev, name: n }))}
                  style={{
                    padding: '5px 10px',
                    background: draft.name === n ? '#292524' : 'transparent',
                    border: `1px solid ${draft.name === n ? '#d97706' : '#292524'}`,
                    borderRadius: 8,
                    color: draft.name === n ? '#f59e0b' : '#78716c',
                    fontSize: 12, cursor: 'pointer'
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Age */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Age
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="number"
            min={15}
            max={80}
            value={draft.age || ''}
            onChange={e => setDraft(prev => ({ ...prev, age: parseInt(e.target.value, 10) || 30 }))}
            style={{
              flex: 1, padding: '12px 14px',
              background: '#1c1917', border: '1px solid #292524',
              borderRadius: 10, color: '#e7e5e4', fontSize: 20, fontWeight: 700,
              textAlign: 'center', outline: 'none'
            }}
          />
          <button
            onClick={rollAge}
            style={{
              padding: '12px 18px', background: 'transparent',
              border: '1px solid #44403c', borderRadius: 10,
              color: '#78716c', fontSize: 14, cursor: 'pointer', fontWeight: 700
            }}
          >
            🎲 Roll 2d20+10
          </button>
        </div>
      </div>

      {/* Omens */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Omen {isFoundling ? '(Foundling — always)' : '(youngest character)'}
          </label>
          {!isFoundling && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: '#78716c' }}>
              <input
                type="checkbox"
                checked={!!draft.showOmens}
                onChange={e => setDraft(prev => ({ ...prev, showOmens: e.target.checked }))}
                style={{ accentColor: '#d97706' }}
              />
              Youngest?
            </label>
          )}
        </div>

        {(isFoundling || draft.showOmens) && (
          <>
            <button
              onClick={rollOmen}
              disabled={rolling}
              style={{
                width: '100%', padding: '11px',
                background: rolling ? '#292524' : '#1c1917',
                border: `1px solid ${rolling ? '#44403c' : '#d97706'}`,
                borderRadius: 10,
                color: rolling ? '#78716c' : '#d97706',
                fontSize: 14, fontWeight: 700, cursor: rolling ? 'default' : 'pointer',
                marginBottom: 10, transition: 'all 0.2s'
              }}
            >
              🎲 {rolling ? 'Rolling…' : 'Roll Omen (d20)'}
            </button>

            {draft.omens?.[0] && (
              <div style={{
                padding: '14px', background: '#0d0d1a',
                border: '1px solid #1e1b4b', borderRadius: 10,
                fontSize: 13, color: '#a5b4fc', lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                "{draft.omens[0]}"
                {isFoundling && (
                  <p style={{ margin: '8px 0 0', fontSize: 11, color: '#6366f1', fontStyle: 'normal' }}>
                    Keep this private for now.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary */}
      <div style={{
        background: '#1c1917', border: '1px solid #292524',
        borderRadius: 14, padding: '16px', marginBottom: 16
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Character Summary
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Name', value: draft.name || '—' },
            { label: 'Background', value: bg?.name || '—' },
            { label: 'Age', value: draft.age || '—' },
            { label: 'HP', value: draft.hp?.max || '—' },
            { label: 'STR', value: `${draft.str?.current || '—'} / ${draft.str?.max || '—'}` },
            { label: 'DEX', value: `${draft.dex?.current || '—'} / ${draft.dex?.max || '—'}` },
            { label: 'WIL', value: `${draft.wil?.current || '—'} / ${draft.wil?.max || '—'}` },
            { label: 'Armor', value: draft.armor ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#e7e5e4' }}>{String(value)}</span>
            </div>
          ))}
        </div>

        {/* Traits summary */}
        {draft.traits && Object.values(draft.traits).some(Boolean) && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #292524' }}>
            <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Traits</div>
            <p style={{ margin: 0, fontSize: 12, color: '#a8a29e', lineHeight: 1.6 }}>
              {Object.values(draft.traits).filter(Boolean).join(' · ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
