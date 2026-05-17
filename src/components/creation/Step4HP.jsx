import { useState } from 'react'
import { rollD6 } from '../../utils/dice'
import { getBackgroundById, deriveArmorFromGear } from '../../data/backgrounds'

export default function Step4HP({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)
  const bg = getBackgroundById(draft.background)

  const inventoryNames = (draft.inventory || []).map(i => i.name)
  const derivedArmor = deriveArmorFromGear(inventoryNames)

  function rollHP() {
    setRolling(true)
    setTimeout(() => {
      const val = rollD6()
      setDraft(prev => ({
        ...prev,
        hp: { current: val, max: val },
        armor: derivedArmor
      }))
      setRolling(false)
    }, 350)
  }

  function setManualHP(val) {
    const num = Math.max(1, Math.min(12, parseInt(val, 10) || 1))
    setDraft(prev => ({ ...prev, hp: { current: num, max: num } }))
  }

  function setArmor(val) {
    const num = Math.max(0, Math.min(3, parseInt(val, 10) || 0))
    setDraft(prev => ({ ...prev, armor: num }))
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Roll 1d6 for your Hit Protection (HP). HP reflects your ability to avoid harm — not your health. Armor reduces incoming damage.
      </p>

      {/* HP Roll */}
      <div style={{
        background: '#1c1917', border: '1px solid #292524',
        borderRadius: 14, padding: '20px', marginBottom: 16
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
          Hit Protection
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="number"
            min={1}
            max={12}
            value={draft.hp?.current || ''}
            onChange={e => setManualHP(e.target.value)}
            placeholder="—"
            style={{
              width: 80, height: 80,
              background: '#0c0a09', border: '1px solid #292524',
              borderRadius: 12, color: '#e7e5e4',
              fontSize: 36, fontWeight: 800, textAlign: 'center', outline: 'none'
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 8px', color: '#a8a29e', fontSize: 13, lineHeight: 1.5 }}>
              Roll 1d6 or enter a value. HP is fully restored by resting briefly in a safe place.
            </p>
            <button
              onClick={rollHP}
              disabled={rolling}
              style={{
                padding: '10px 20px',
                background: rolling ? '#292524' : '#d97706',
                border: 'none', borderRadius: 10,
                color: rolling ? '#78716c' : '#1c1917',
                fontWeight: 700, fontSize: 14,
                cursor: rolling ? 'default' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              🎲 {rolling ? 'Rolling…' : 'Roll 1d6'}
            </button>
          </div>
        </div>
      </div>

      {/* Armor */}
      <div style={{
        background: '#1c1917', border: '1px solid #292524',
        borderRadius: 14, padding: '20px', marginBottom: 16
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
          Armor
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="number"
            min={0}
            max={3}
            value={draft.armor ?? 0}
            onChange={e => setArmor(e.target.value)}
            style={{
              width: 80, height: 80,
              background: '#0c0a09', border: '1px solid #292524',
              borderRadius: 12, color: '#a8a29e',
              fontSize: 36, fontWeight: 800, textAlign: 'center', outline: 'none'
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 6px', color: '#a8a29e', fontSize: 13, lineHeight: 1.5 }}>
              Derived from your starting gear. Max is 3.
            </p>
            {derivedArmor > 0 && (
              <div style={{ fontSize: 12, color: '#d97706' }}>
                ✓ Detected <strong>{derivedArmor}</strong> Armor from starting gear
              </div>
            )}
            <div style={{ marginTop: 8, fontSize: 11, color: '#57534e' }}>
              0 = No armor | 1 = Light | 2 = Medium | 3 = Heavy (max)
            </div>
          </div>
        </div>
      </div>

      {/* Inventory preview */}
      {draft.inventory?.length > 0 && (
        <div style={{
          background: '#1c1917', border: '1px solid #292524',
          borderRadius: 14, padding: '16px'
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Starting Inventory ({draft.inventory.filter(i => !i.isPetty).length}/10 slots)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {draft.inventory.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, color: '#a8a29e'
              }}>
                <span style={{
                  fontSize: 10, color: '#57534e',
                  background: '#0c0a09', padding: '1px 5px', borderRadius: 3, minWidth: 18, textAlign: 'center'
                }}>
                  {item.isPetty ? '~' : item.slots === 2 ? '2' : '1'}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
