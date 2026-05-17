import { useState } from 'react'
import { roll3d6 } from '../../utils/dice'

export default function Step3Attributes({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)
  const [swapA, setSwapA] = useState(null)

  const attrs = ['str', 'dex', 'wil']
  const labels = { str: 'Strength', dex: 'Dexterity', wil: 'Willpower' }
  const hints = {
    str: 'Power, lifting, breaking, poison resistance',
    dex: 'Speed, reflexes, dodging, sneaking, balance',
    wil: 'Persuasion, charm, intimidation, spell control'
  }

  const hasRolled = !!(draft.str?.current && draft.dex?.current && draft.wil?.current)

  function rollAll() {
    setRolling(true)
    setSwapA(null)
    setTimeout(() => {
      const s = roll3d6(), d = roll3d6(), w = roll3d6()
      setDraft(prev => ({
        ...prev,
        str: { current: s, max: s },
        dex: { current: d, max: d },
        wil: { current: w, max: w },
      }))
      setRolling(false)
    }, 400)
  }

  function rollOne(attr) {
    const val = roll3d6()
    setDraft(prev => ({ ...prev, [attr]: { current: val, max: val } }))
  }

  function handleCardTap(attr) {
    if (!hasRolled) return
    if (swapA === null) {
      setSwapA(attr)
    } else if (swapA === attr) {
      setSwapA(null)
    } else {
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
        🎲 {rolling ? 'Rolling…' : hasRolled ? 'Re-roll All' : 'Roll All Attributes'}
      </button>

      {swapA && (
        <div style={{ padding: '10px 14px', background: '#1c1200', border: '1px solid #854d0e', borderRadius: 10, marginBottom: 12, fontSize: 13, color: '#fde68a' }}>
          Tap another attribute card to swap with <strong>{labels[swapA]}</strong> — or tap it again to cancel
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {attrs.map(attr => {
          const val = draft[attr]?.current
          const isSwapSelected = swapA === attr
          const inSwapMode = swapA !== null && swapA !== attr

          return (
            <div
              key={attr}
              onClick={() => swapA !== null && handleCardTap(attr)}
              style={{
                background: isSwapSelected ? '#1c1200' : inSwapMode ? '#1a1814' : '#1c1917',
                border: `1.5px solid ${isSwapSelected ? '#d97706' : inSwapMode ? '#854d0e' : '#292524'}`,
                borderRadius: 12,
                padding: '14px 16px',
                transition: 'border-color 0.15s, background 0.15s',
                cursor: swapA !== null ? 'pointer' : 'default'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Value display / input */}
                {val ? (
                  <input
                    type="number"
                    min={3}
                    max={18}
                    value={val}
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleManual(attr, e.target.value)}
                    style={{
                      width: 64, height: 64,
                      background: '#0c0a09',
                      border: `1px solid ${isSwapSelected ? '#d97706' : '#292524'}`,
                      borderRadius: 10, color: isSwapSelected ? '#fde68a' : '#e7e5e4',
                      fontSize: 28, fontWeight: 800, textAlign: 'center',
                      outline: 'none', flexShrink: 0
                    }}
                  />
                ) : (
                  <div style={{
                    width: 64, height: 64,
                    background: '#0c0a09', border: '1px dashed #44403c',
                    borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, color: '#44403c', flexShrink: 0
                  }}>
                    —
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: isSwapSelected ? '#fde68a' : '#e7e5e4', marginBottom: 4 }}>
                    {labels[attr]}
                  </div>
                  <div style={{ fontSize: 11, color: '#57534e', lineHeight: 1.4 }}>
                    {hints[attr]}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button
                    onClick={e => { e.stopPropagation(); rollOne(attr) }}
                    style={{
                      padding: '6px 12px', background: 'transparent',
                      border: '1px solid #44403c', borderRadius: 6,
                      color: '#78716c', fontSize: 12, cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    🎲 Re-roll
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleCardTap(attr) }}
                    disabled={!hasRolled}
                    style={{
                      padding: '6px 12px',
                      background: isSwapSelected ? '#1c1200' : 'transparent',
                      border: `1px solid ${isSwapSelected ? '#d97706' : '#44403c'}`,
                      borderRadius: 6,
                      color: isSwapSelected ? '#d97706' : hasRolled ? '#78716c' : '#3a3635',
                      fontSize: 12, cursor: hasRolled ? 'pointer' : 'default', fontWeight: 600
                    }}
                  >
                    {isSwapSelected ? '✕ Cancel' : '⇄ Swap'}
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
