import { useState } from 'react'
import { bonds } from '../../data/bonds'
import { rollD20 } from '../../utils/dice'
import { getBackgroundById } from '../../data/backgrounds'

export default function Step6Bonds({ draft, setDraft }) {
  const [rolling, setRolling] = useState(false)
  const [selectingSlot, setSelectingSlot] = useState(0) // 0 or 1

  const bg = getBackgroundById(draft.background)
  const needsTwoBonds = bg?.specialRule?.toLowerCase().includes('bonds twice') || draft.requiresExtraBond

  const currentBonds = draft.bonds || []
  const bond0 = currentBonds[0] || null
  const bond1 = currentBonds[1] || null

  function handleSelect(bond) {
    const bondItems = (bond.items || []).map(name => ({
      id: crypto.randomUUID(),
      name,
      slots: name.toLowerCase().includes('bulky') ? 2 : 1,
      isFatigue: false,
      isPetty: name.toLowerCase().includes('petty'),
      notes: ''
    }))

    const goldBonus = bond.gold || 0

    setDraft(prev => {
      const prevBonds = prev.bonds || []
      const prevBond = prevBonds[selectingSlot] || null

      // Remove items from the bond being replaced
      const prevBondItemIds = prev[`bondInventoryItems${selectingSlot}`] || []
      const cleanInventory = (prev.inventory || []).filter(i => !prevBondItemIds.includes(i.id))

      // Adjust gold: remove previous bond's gold, add new bond's gold
      const prevGoldBonus = prev[`bondGoldBonus${selectingSlot}`] || 0
      const newGold = Math.max(0, (prev.gold || 0) - prevGoldBonus + goldBonus)

      const newBondEntry = { roll: bond.roll, text: bond.text, item: bond.items?.[0] || null, special: bond.special }
      const newBonds = [...prevBonds]
      newBonds[selectingSlot] = newBondEntry

      return {
        ...prev,
        bonds: newBonds,
        bond: newBonds[0], // backwards compat
        inventory: [...cleanInventory, ...bondItems],
        [`bondInventoryItems${selectingSlot}`]: bondItems.map(i => i.id),
        [`bondGoldBonus${selectingSlot}`]: goldBonus,
        gold: newGold,
      }
    })

    // If dual bonds and we just picked slot 0, auto-switch to slot 1
    if (needsTwoBonds && selectingSlot === 0 && !bond1) {
      setSelectingSlot(1)
    }
  }

  function handleRoll() {
    setRolling(true)
    setTimeout(() => {
      const idx = rollD20() - 1
      handleSelect(bonds[idx])
      setRolling(false)
    }, 350)
  }

  const selectedRoll0 = bond0?.roll
  const selectedRoll1 = bond1?.roll

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Your Bond ties you to the world — a mysterious item, a debt, a curse, or a connection to the Wood. Roll or choose.
        {needsTwoBonds && <strong style={{ color: '#d97706' }}> You must choose two Bonds.</strong>}
      </p>

      {/* Dual bond slot selector */}
      {needsTwoBonds && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[0, 1].map(slot => (
            <button
              key={slot}
              onClick={() => setSelectingSlot(slot)}
              style={{
                flex: 1, padding: '10px',
                background: selectingSlot === slot ? '#1c1200' : '#1c1917',
                border: `1.5px solid ${selectingSlot === slot ? '#d97706' : (slot === 0 ? bond0 : bond1) ? '#166534' : '#44403c'}`,
                borderRadius: 10, cursor: 'pointer',
                color: selectingSlot === slot ? '#fde68a' : '#a8a29e',
                fontSize: 13, fontWeight: 700, textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ fontSize: 11, color: '#57534e', marginBottom: 3 }}>Bond {slot + 1}</div>
              <div style={{ fontSize: 12, color: (slot === 0 ? bond0 : bond1) ? '#4ade80' : '#57534e' }}>
                {(slot === 0 ? bond0 : bond1) ? `✓ ${(slot === 0 ? bond0 : bond1).text.slice(0, 40)}…` : 'Not chosen yet'}
              </div>
            </button>
          ))}
        </div>
      )}

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
        🎲 {rolling ? 'Rolling…' : `Roll d20${needsTwoBonds ? ` for Bond ${selectingSlot + 1}` : ''}`}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bonds.map(bond => {
          const isSelected0 = selectedRoll0 === bond.roll
          const isSelected1 = selectedRoll1 === bond.roll
          const isSelected = selectingSlot === 0 ? isSelected0 : isSelected1
          const isOtherSlot = selectingSlot === 0 ? isSelected1 : isSelected0

          return (
            <button
              key={bond.roll}
              onClick={() => handleSelect(bond)}
              style={{
                background: isSelected ? '#1c1917' : isOtherSlot ? '#111817' : 'transparent',
                border: `1.5px solid ${isSelected ? '#d97706' : isOtherSlot ? '#166534' : '#292524'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  color: isSelected ? '#f59e0b' : isOtherSlot ? '#4ade80' : '#57534e',
                  background: '#0c0a09', padding: '3px 7px', borderRadius: 5,
                  flexShrink: 0, minWidth: 26, textAlign: 'center'
                }}>
                  {bond.roll}
                </span>
                <div style={{ flex: 1 }}>
                  {isOtherSlot && !isSelected && (
                    <div style={{ fontSize: 10, color: '#4ade80', marginBottom: 4 }}>
                      ✓ Bond {selectingSlot === 0 ? 2 : 1}
                    </div>
                  )}
                  <p style={{ margin: 0, fontSize: 13, color: isSelected ? '#e7e5e4' : '#a8a29e', lineHeight: 1.6 }}>
                    {bond.text}
                  </p>
                  {(isSelected || isOtherSlot) && bond.items?.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {bond.items.map((item, i) => (
                        <span key={i} style={{
                          fontSize: 11, color: '#d97706',
                          background: '#1c0a00', padding: '2px 8px', borderRadius: 5
                        }}>+ {item}</span>
                      ))}
                    </div>
                  )}
                  {(isSelected || isOtherSlot) && bond.special && (
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
