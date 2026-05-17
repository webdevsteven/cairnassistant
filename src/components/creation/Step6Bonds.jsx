import { useState } from 'react'
import { bonds } from '../../data/bonds'
import { rollD20 } from '../../utils/dice'

export default function Step6Bonds({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)

  function handleSelect(bond) {
    // Add bond items to inventory
    const bondItems = bond.items.map(name => ({
      id: crypto.randomUUID(),
      name,
      slots: 1,
      isFatigue: false,
      isPetty: name.toLowerCase().includes('petty'),
      notes: ''
    }))

    const goldBonus = bond.gold || 0

    setDraft(prev => {
      // Remove any previous bond items (we mark them)
      const prevBondItems = prev.bondInventoryItems || []
      const cleanInventory = prev.inventory.filter(i => !prevBondItems.includes(i.id))
      const newBondIds = bondItems.map(i => i.id)

      return {
        ...prev,
        bond: { roll: bond.roll, text: bond.text, item: bond.items[0] || null, special: bond.special },
        inventory: [...cleanInventory, ...bondItems],
        bondInventoryItems: newBondIds,
        gold: (prev.gold || 0) + goldBonus
      }
    })
  }

  function handleRoll() {
    setRolling(true)
    setTimeout(() => {
      const idx = rollD20() - 1
      handleSelect(bonds[idx])
      setRolling(false)
    }, 350)
  }

  const selectedBond = draft.bond ? bonds.find(b => b.roll === draft.bond.roll) : null

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Your Bond ties you to the world — a mysterious item, a debt, a curse, or a connection to the Wood. Roll or choose.
      </p>

      <button
        onClick={handleRoll}
        disabled={rolling}
        style={{
          width: '100%', padding: '13px',
          background: rolling ? '#292524' : '#d97706',
          border: 'none', borderRadius: 12,
          color: rolling ? '#78716c' : '#1c1917',
          fontWeight: 700, fontSize: 16,
          cursor: rolling ? 'default' : 'pointer',
          marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'background 0.2s'
        }}
      >
        🎲 {rolling ? 'Rolling…' : 'Roll d20'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bonds.map(bond => {
          const isSelected = draft.bond?.roll === bond.roll
          return (
            <button
              key={bond.roll}
              onClick={() => handleSelect(bond)}
              style={{
                background: isSelected ? '#1c1917' : 'transparent',
                border: `1.5px solid ${isSelected ? '#d97706' : '#292524'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, color: isSelected ? '#f59e0b' : '#57534e',
                  background: '#0c0a09', padding: '3px 7px', borderRadius: 5,
                  flexShrink: 0, minWidth: 26, textAlign: 'center'
                }}>
                  {bond.roll}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: isSelected ? '#e7e5e4' : '#a8a29e', lineHeight: 1.6 }}>
                    {bond.text}
                  </p>
                  {isSelected && bond.items.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {bond.items.map((item, i) => (
                        <span key={i} style={{
                          fontSize: 11, color: '#d97706',
                          background: '#1c0a00', padding: '2px 8px', borderRadius: 5
                        }}>+ {item}</span>
                      ))}
                    </div>
                  )}
                  {isSelected && bond.special && (
                    <div style={{ marginTop: 6, fontSize: 11, color: '#a78bfa', fontStyle: 'italic' }}>
                      ✦ {bond.special}
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
