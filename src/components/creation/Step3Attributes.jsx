import { useState } from 'react'
import { roll3d6 } from '../../utils/dice'

export default function Step3Attributes({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)
  const [swapA, setSwapA] = useState(null)

  const attrs = ['str', 'dex', 'wil']
  const labels = { str: 'Strength', dex: 'Dexterity', wil: 'Willpower' }
  const descriptions = {
    str: 'Physical power, lifting, breaking, resisting poison',
    dex: 'Speed, reflexes, dodging, climbing, sneaking, balancing',
    wil: 'Persuasion, deception, charm, intimidation, spell manipulation'
  }

  function rollAll() {
    setRolling(true)
    setSwapA(null)
    setTimeout(() => {
      setDraft(prev => ({
        ...prev,
        str: { current: roll3d6(), max: prev.str?.max || 10 },
        dex: { current: roll3d6(), max: prev.dex?.max || 10 },
        wil: { current: roll3d6(), max: prev.wil?.max || 10 },
      }))
      // Update max to match rolled values after a beat
      setTimeout(() => {
        setDraft(prev => ({
          ...prev,
          str: { current: prev.str.current, max: prev.str.current },
          dex: { current: prev.dex.current, max: prev.dex.current },
          wil: { current: prev.wil.current, max: prev.wil.current },
        }))
        setRolling(false)
      }, 50)
    }, 400)
  }

  function rollOne(attr) {
    const val = roll3d6()
    setDraft(prev => ({ ...prev, [attr]: { current: val, max: val } }))
  }

  function handleSwap(attr) {
    if (swapA === null) {
      setSwapA(attr)
    } else if (swapA === attr) {
      setSwapA(null)
    } else {
      // Perform swap
      setDraft(prev => {
        const aVal = prev[swapA].current
        const bVal = prev[attr].current
        return {
          ...prev,
          [swapA]: { current: bVal, max: bVal },
          [attr]: { current: aVal, max: aVal }
        }
      })
      setSwapA(null)
    }
  }

  function handleManual(attr, val) {
    const num = Math.max(3, Math.min(18, parseInt(val, 10) || 3))
    setDraft(prev => ({ ...prev, [attr]: { current: num, max: num } }))
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 4px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Roll 3d6 for each attribute in order. You may then swap any two results.
      </p>
      <p style={{ margin: '0 0 16px', color: '#57534e', fontSize: 12 }}>
        Saves: roll d20 equal to or under the relevant attribute to succeed.
      </p>

      <button
        onClick={rollAll}
        disabled={rolling}
        style={{
          width: '100%', padding: '13px',
          background: rolling ? '#292524' : '#d97706',
          border: 'none', borderRadius: 12,
          color: rolling ? '#78716c' : '#1c1917',
          fontWeight: 700, fontSize: 16,
          cursor: rolling ? 'default' : 'pointer',
          marginBottom: 16, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8,
          transition: 'background 0.2s'
        }}
      >
        🎲 {rolling ? 'Rolling…' : 'Roll All Attributes'}
      </button>

      {swapA && (
        <div style={{ padding: '10px 14px', background: '#1c1200', border: '1px solid #854d0e', borderRadius: 10, marginBottom: 12, fontSize: 13, color: '#fde68a' }}>
          Tap another attribute to swap with <strong>{labels[swapA]}</strong>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {attrs.map(attr => {
          const val = draft[attr]?.current || '—'
          const isSwapSelected = swapA === attr
          return (
            <div
              key={attr}
              style={{
                background: '#1c1917',
                border: `1.5px solid ${isSwapSelected ? '#d97706' : '#292524'}`,
                borderRadius: 12,
                padding: '14px 16px',
                transition: 'border-color 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Big number */}
                <input
                  type="number"
                  min={3}
                  max={18}
                  value={draft[attr]?.current || ''}
                  onChange={e => handleManual(attr, e.target.value)}
                  placeholder="—"
                  style={{
                    width: 64, height: 64,
                    background: '#0c0a09', border: '1px solid #292524',
                    borderRadius: 10, color: '#e7e5e4',
                    fontSize: 28, fontWeight: 800, textAlign: 'center',
                    outline: 'none', flexShrink: 0
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#e7e5e4', marginBottom: 4 }}>
                    {labels[attr]}
                  </div>
                  <div style={{ fontSize: 11, color: '#57534e', lineHeight: 1.4 }}>
                    {descriptions[attr]}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button
                    onClick={() => rollOne(attr)}
                    style={{
                      padding: '6px 12px', background: 'transparent',
                      border: '1px solid #44403c', borderRadius: 6,
                      color: '#78716c', fontSize: 12, cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    🎲 Re-roll
                  </button>
                  <button
                    onClick={() => handleSwap(attr)}
                    style={{
                      padding: '6px 12px',
                      background: isSwapSelected ? '#1c1200' : 'transparent',
                      border: `1px solid ${isSwapSelected ? '#d97706' : '#44403c'}`,
                      borderRadius: 6,
                      color: isSwapSelected ? '#d97706' : '#78716c',
                      fontSize: 12, cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    ⇄ Swap
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
