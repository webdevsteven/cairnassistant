import { useState } from 'react'
import InventorySlot from './InventorySlot'

function ItemModal({ item, onSave, onDelete, onClose }) {
  const [name, setName] = useState(item?.name || '')
  const [slots, setSlots] = useState(item?.slots || 1)
  const [isFatigue, setIsFatigue] = useState(item?.isFatigue || false)
  const [isPetty, setIsPetty] = useState(item?.isPetty || false)
  const [notes, setNotes] = useState(item?.notes || '')

  function handleSave() {
    if (!name.trim()) return
    onSave({ id: item?.id || crypto.randomUUID(), name: name.trim(), slots: isPetty ? 0 : slots, isFatigue, isPetty, notes })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'flex-end', zIndex: 100,
      animation: 'fadeIn 0.15s ease'
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', background: '#1c1917',
          borderTop: '1px solid #292524',
          borderRadius: '16px 16px 0 0',
          padding: 20,
          animation: 'slideUp 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: '#e7e5e4', fontSize: 18 }}>
            {item?.id ? 'Edit Item' : 'Add Item'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#78716c', fontSize: 24, cursor: 'pointer', padding: 4 }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            autoFocus
            type="text"
            placeholder="Item name…"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            style={inputStyle}
          />

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Petty (0 slots)', active: isPetty, onClick: () => { setIsPetty(true); setSlots(0); setIsFatigue(false) } },
              { label: 'Normal (1 slot)', active: !isPetty && slots === 1, onClick: () => { setIsPetty(false); setSlots(1) } },
              { label: 'Bulky (2 slots)', active: !isPetty && slots === 2, onClick: () => { setIsPetty(false); setSlots(2) } },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={btn.onClick}
                style={{
                  flex: 1, padding: '8px 4px', fontSize: 11, fontWeight: 600,
                  background: btn.active ? '#292524' : 'transparent',
                  border: `1px solid ${btn.active ? '#d97706' : '#44403c'}`,
                  borderRadius: 8, color: btn.active ? '#d97706' : '#78716c',
                  cursor: 'pointer'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isFatigue}
              onChange={e => setIsFatigue(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: '#ea580c' }}
            />
            <span style={{ color: '#a8a29e', fontSize: 14 }}>Mark as Fatigue</span>
          </label>

          <input
            type="text"
            placeholder="Notes (optional)…"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{ ...inputStyle, color: '#a8a29e' }}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {item?.id && (
              <button onClick={onDelete} style={{ ...btnStyle, background: '#7f1d1d', borderColor: '#991b1b', color: '#fca5a5', flex: '0 0 auto', width: 52 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{width:18,height:18}}>
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                </svg>
              </button>
            )}
            <button onClick={handleSave} style={{ ...btnStyle, flex: 1 }}>
              {item?.id ? 'Save Changes' : 'Add to Inventory'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: '#0c0a09', border: '1px solid #292524',
  borderRadius: 10, color: '#e7e5e4', fontSize: 15,
  outline: 'none'
}
const btnStyle = {
  padding: '14px 20px', background: '#d97706', border: '1px solid #b45309',
  borderRadius: 10, color: '#1c1917', fontSize: 15, fontWeight: 700,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
}

export default function InventoryGrid({ inventory, onChange }) {
  const [modal, setModal] = useState(null)

  const usedSlots = inventory.reduce((sum, item) => sum + (item.isPetty ? 0 : (item.slots || 1)), 0)
  const maxSlots = 10
  const full = usedSlots >= maxSlots

  // Build slot display — bulky items occupy 2 consecutive visual slots
  const displaySlots = []
  const usedIds = new Set()

  for (const item of inventory) {
    if (usedIds.has(item.id)) continue
    if (!item.isPetty) {
      displaySlots.push(item)
      usedIds.add(item.id)
      if (item.slots === 2) displaySlots.push({ _continuation: true, id: item.id + '_cont' })
    }
  }

  // Fill to 10
  while (displaySlots.length < maxSlots) displaySlots.push(null)
  const visible = displaySlots.slice(0, maxSlots)

  function handleAdd() {
    setModal({ adding: true })
  }

  function handleEdit(item) {
    setModal({ editing: true, item })
  }

  function handleSave(updated) {
    if (modal?.editing) {
      onChange(inventory.map(i => i.id === updated.id ? updated : i))
    } else {
      if (!updated.isPetty && usedSlots + (updated.slots || 1) > maxSlots) return
      onChange([...inventory, updated])
    }
    setModal(null)
  }

  function handleDelete() {
    onChange(inventory.filter(i => i.id !== modal.item.id))
    setModal(null)
  }

  return (
    <div>
      {/* Slot counter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: '#78716c', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Inventory
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700,
          color: full ? '#dc2626' : usedSlots >= 8 ? '#f97316' : '#78716c'
        }}>
          {usedSlots} / {maxSlots} slots
          {full && ' — FULL (0 HP!)'}
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8
      }}>
        {visible.map((slot, i) => {
          if (slot?._continuation) {
            return (
              <div key={slot.id} style={{
                background: '#1c1917',
                border: '1px dashed #292524',
                borderRadius: 8,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: 10, color: '#44403c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>bulky cont.</span>
              </div>
            )
          }
          return (
            <InventorySlot
              key={slot?.id || `empty-${i}`}
              item={slot}
              index={i}
              onEdit={handleEdit}
              onAdd={!full ? handleAdd : () => {}}
            />
          )
        })}
      </div>

      {/* Petty items */}
      {inventory.filter(i => i.isPetty).length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
            Petty (no slot)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {inventory.filter(i => i.isPetty).map(item => (
              <button
                key={item.id}
                onClick={() => handleEdit(item)}
                style={{
                  padding: '5px 10px',
                  background: '#1c1917',
                  border: '1px solid #292524',
                  borderRadius: 20,
                  color: '#a8a29e',
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={full}
        style={{
          width: '100%', marginTop: 12, padding: '11px',
          background: 'transparent',
          border: `1px dashed ${full ? '#292524' : '#44403c'}`,
          borderRadius: 10,
          color: full ? '#44403c' : '#78716c',
          fontSize: 13, fontWeight: 600, cursor: full ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
        }}
      >
        + Add Item
      </button>

      {modal && (
        <ItemModal
          item={modal.item}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
