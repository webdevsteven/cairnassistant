import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import TopBar from '../components/layout/TopBar'
import StatBox from '../components/character/StatBox'
import InventoryGrid from '../components/character/InventoryGrid'
import { rollD20 } from '../utils/dice'
import { getBackgroundById } from '../data/backgrounds'

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14, color: '#44403c', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
    </div>
  )
}

function CritDamageModal({ character, onClose }) {
  const [result, setResult] = useState(null)
  const strCurrent = character.str?.current || 0

  function roll() {
    const roll = rollD20()
    setResult({ roll, success: roll <= strCurrent })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: '#1c1917', borderTop: '1px solid #292524',
        borderRadius: '16px 16px 0 0', padding: 24,
        animation: 'slideUp 0.2s ease'
      }}>
        <h3 style={{ margin: '0 0 8px', color: '#e7e5e4', fontSize: 20 }}>Critical Damage Save</h3>
        <p style={{ margin: '0 0 20px', color: '#78716c', fontSize: 14 }}>
          Roll d20 — must roll <strong style={{ color: '#e7e5e4' }}>equal to or under STR ({strCurrent})</strong> to succeed.
        </p>
        <button
          onClick={roll}
          style={{
            width: '100%', padding: '16px',
            background: '#7f1d1d', border: '1px solid #991b1b',
            borderRadius: 12, color: '#fca5a5', fontSize: 18, fontWeight: 800,
            cursor: 'pointer', marginBottom: 16
          }}
        >
          🎲 Roll d20
        </button>
        {result && (
          <div style={{
            padding: '16px', textAlign: 'center',
            background: result.success ? '#052e16' : '#450a0a',
            border: `1px solid ${result.success ? '#166534' : '#991b1b'}`,
            borderRadius: 12
          }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: result.success ? '#4ade80' : '#f87171', lineHeight: 1 }}>
              {result.roll}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, color: result.success ? '#86efac' : '#fca5a5' }}>
              {result.success ? '✓ Success — Still fighting!' : '✗ Failure — Critical Damage!'}
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: result.success ? '#4ade80' : '#f87171' }}>
              {result.success
                ? 'You continue, but must save again if damaged further.'
                : 'You can only crawl. Stabilized by bandages; die within 1 hour untreated.'}
            </p>
          </div>
        )}
        <button onClick={onClose} style={{ width: '100%', marginTop: 12, padding: '12px', background: 'transparent', border: '1px solid #44403c', borderRadius: 10, color: '#78716c', fontSize: 14, cursor: 'pointer' }}>
          Close
        </button>
      </div>
    </div>
  )
}

function EditableText({ value, onChange, placeholder, multiline = false, style: extraStyle = {} }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)

  useEffect(() => { setVal(value) }, [value])

  function commit() {
    setEditing(false)
    if (val !== value) onChange(val)
  }

  const baseStyle = {
    background: '#1c1917', border: '1px solid #292524',
    borderRadius: 8, color: '#e7e5e4',
    width: '100%', fontSize: 14, outline: 'none',
    padding: '10px 12px', ...extraStyle
  }

  if (editing) {
    const props = {
      value: val,
      onChange: e => setVal(e.target.value),
      onBlur: commit,
      autoFocus: true,
      style: { ...baseStyle, border: '1px solid #d97706' }
    }
    return multiline
      ? <textarea {...props} rows={4} style={{ ...props.style, resize: 'vertical' }} onKeyDown={e => e.key === 'Escape' && commit()} />
      : <input {...props} onKeyDown={e => (e.key === 'Enter' || e.key === 'Escape') && commit()} />
  }

  return (
    <div
      onClick={() => setEditing(true)}
      style={{
        ...baseStyle,
        cursor: 'text',
        minHeight: multiline ? 60 : 'auto',
        color: value ? '#e7e5e4' : '#44403c',
        lineHeight: 1.6,
        whiteSpace: multiline ? 'pre-wrap' : 'normal'
      }}
    >
      {value || placeholder}
    </div>
  )
}

function MagicItem({ item, onEdit, onDelete, type }) {
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState(item)

  function save() {
    onEdit(data)
    setEditing(false)
  }

  if (editing) {
    return (
      <div style={{ background: '#1c1917', border: '1px solid #d97706', borderRadius: 10, padding: 12 }}>
        <input
          value={data.name}
          onChange={e => setData(d => ({ ...d, name: e.target.value }))}
          placeholder="Name"
          style={{ width: '100%', background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 14, padding: '8px 10px', marginBottom: 8, outline: 'none', boxSizing: 'border-box' }}
        />
        {type === 'spell' && (
          <input
            value={data.spell || ''}
            onChange={e => setData(d => ({ ...d, spell: e.target.value }))}
            placeholder="Spell description"
            style={{ width: '100%', background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 13, padding: '8px 10px', marginBottom: 8, outline: 'none', boxSizing: 'border-box' }}
          />
        )}
        {type === 'relic' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input type="number" value={data.charges || 0} onChange={e => setData(d => ({ ...d, charges: +e.target.value }))} placeholder="Charges" style={{ flex: 1, background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 14, padding: '8px 10px', textAlign: 'center', outline: 'none' }} />
              <span style={{ color: '#57534e', alignSelf: 'center' }}>/</span>
              <input type="number" value={data.maxCharges || 0} onChange={e => setData(d => ({ ...d, maxCharges: +e.target.value }))} placeholder="Max" style={{ flex: 1, background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 14, padding: '8px 10px', textAlign: 'center', outline: 'none' }} />
            </div>
            <input value={data.recharge || ''} onChange={e => setData(d => ({ ...d, recharge: e.target.value }))} placeholder="Recharge condition" style={{ width: '100%', background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 13, padding: '8px 10px', marginBottom: 8, outline: 'none', boxSizing: 'border-box' }} />
            <input value={data.effect || ''} onChange={e => setData(d => ({ ...d, effect: e.target.value }))} placeholder="Effect" style={{ width: '100%', background: '#0c0a09', border: '1px solid #292524', borderRadius: 6, color: '#e7e5e4', fontSize: 13, padding: '8px 10px', marginBottom: 8, outline: 'none', boxSizing: 'border-box' }} />
          </>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={save} style={{ flex: 1, padding: '8px', background: '#d97706', border: 'none', borderRadius: 8, color: '#1c1917', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save</button>
          <button onClick={() => onDelete(item.id)} style={{ padding: '8px 12px', background: '#7f1d1d', border: 'none', borderRadius: 8, color: '#fca5a5', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Delete</button>
          <button onClick={() => setEditing(false)} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #44403c', borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <button onClick={() => setEditing(true)} style={{
      width: '100%', background: '#1c1917', border: '1px solid #292524',
      borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#e7e5e4' }}>{item.name}</span>
        {type === 'relic' && (
          <span style={{ fontSize: 12, color: '#d97706', fontWeight: 700 }}>
            {item.charges}/{item.maxCharges} charges
          </span>
        )}
      </div>
      {(item.spell || item.effect) && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
          {item.spell || item.effect}
        </p>
      )}
      {item.recharge && (
        <p style={{ margin: '4px 0 0', fontSize: 11, color: '#57534e', fontStyle: 'italic' }}>
          Recharge: {item.recharge}
        </p>
      )}
    </button>
  )
}

// ── Container components ──────────────────────────────────────────────────────

function ContainerCard({ container, onUpdate, onDelete }) {
  const [addingItem, setAddingItem] = useState(false)
  const [newName, setNewName]       = useState('')
  const [newSlots, setNewSlots]     = useState(1)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal]       = useState(container.name)

  const usedSlots = (container.items || []).reduce((s, i) => s + (i.slots || 1), 0)
  const freeSlots = container.maxSlots - usedSlots

  function addItem() {
    if (!newName.trim()) return
    onUpdate({
      ...container,
      items: [...(container.items || []), { id: crypto.randomUUID(), name: newName.trim(), slots: newSlots }]
    })
    setNewName(''); setNewSlots(1); setAddingItem(false)
  }

  function removeItem(itemId) {
    onUpdate({ ...container, items: (container.items || []).filter(i => i.id !== itemId) })
  }

  function commitName() {
    setEditingName(false)
    if (nameVal.trim() && nameVal !== container.name) onUpdate({ ...container, name: nameVal.trim() })
  }

  const pct = container.maxSlots > 0 ? Math.min(1, usedSlots / container.maxSlots) : 0
  const barColor = pct >= 1 ? '#ef4444' : pct >= 0.75 ? '#f59e0b' : '#16a34a'

  return (
    <div style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 12, padding: '14px 14px 12px', marginBottom: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {editingName ? (
          <input
            autoFocus value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={commitName}
            onKeyDown={e => (e.key === 'Enter' || e.key === 'Escape') && commitName()}
            style={{ flex: 1, background: '#0c0a09', border: '1px solid #d97706', borderRadius: 6, color: '#e7e5e4', fontSize: 14, fontWeight: 700, padding: '5px 9px', outline: 'none' }}
          />
        ) : (
          <button onClick={() => { setNameVal(container.name); setEditingName(true) }}
            style={{ flex: 1, background: 'none', border: 'none', textAlign: 'left', color: '#e7e5e4', fontSize: 14, fontWeight: 700, cursor: 'text', padding: 0 }}>
            {container.name}
          </button>
        )}
        <span style={{ fontSize: 12, color: freeSlots === 0 ? '#ef4444' : '#78716c', fontWeight: 600, flexShrink: 0 }}>
          {usedSlots}/{container.maxSlots} slots
        </span>
        <button onClick={onDelete}
          style={{ background: 'none', border: 'none', color: '#44403c', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px', flexShrink: 0 }}>
          ×
        </button>
      </div>

      {/* Slot bar */}
      <div style={{ height: 5, background: '#292524', borderRadius: 3, marginBottom: 10, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: barColor, borderRadius: 3, transition: 'width 0.25s, background 0.25s' }} />
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(container.items || []).map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#141211', border: '1px solid #1c1917',
            borderRadius: 8, padding: '7px 10px'
          }}>
            <span style={{ flex: 1, fontSize: 13, color: '#a8a29e' }}>{item.name}</span>
            {item.slots === 2 && <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600 }}>BULKY</span>}
            <span style={{ fontSize: 11, color: '#57534e' }}>{item.slots} slot{item.slots !== 1 ? 's' : ''}</span>
            <button onClick={() => removeItem(item.id)}
              style={{ background: 'none', border: 'none', color: '#44403c', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 2px' }}>
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add item form */}
      {addingItem ? (
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <input
            autoFocus value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            placeholder="Item name…"
            style={{ flex: 1, background: '#0c0a09', border: '1px solid #292524', borderRadius: 7, color: '#e7e5e4', fontSize: 13, padding: '7px 10px', outline: 'none' }}
          />
          <select value={newSlots} onChange={e => setNewSlots(+e.target.value)}
            style={{ background: '#0c0a09', border: '1px solid #292524', borderRadius: 7, color: '#a8a29e', fontSize: 13, padding: '7px 8px', outline: 'none' }}>
            {Array.from({ length: Math.min(freeSlots, 2) }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} slot{n > 1 ? 's' : ''}</option>
            ))}
          </select>
          <button onClick={addItem}
            style={{ padding: '7px 12px', background: '#d97706', border: 'none', borderRadius: 7, color: '#1c1917', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Add
          </button>
          <button onClick={() => setAddingItem(false)}
            style={{ padding: '7px 10px', background: 'transparent', border: '1px solid #292524', borderRadius: 7, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>
            ✕
          </button>
        </div>
      ) : freeSlots > 0 ? (
        <button onClick={() => setAddingItem(true)}
          style={{ width: '100%', marginTop: 8, padding: '7px', background: 'transparent', border: '1px dashed #292524', borderRadius: 7, color: '#57534e', fontSize: 12, cursor: 'pointer' }}>
          + Add item ({freeSlots} slot{freeSlots !== 1 ? 's' : ''} free)
        </button>
      ) : (
        <div style={{ marginTop: 8, fontSize: 11, color: '#ef4444', textAlign: 'center' }}>Container full</div>
      )}
    </div>
  )
}

function ContainersSection({ containers, onChange }) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName]   = useState('')
  const [newSlots, setNewSlots] = useState(4)

  function addContainer() {
    if (!newName.trim() || newSlots < 1) return
    onChange([...containers, { id: crypto.randomUUID(), name: newName.trim(), maxSlots: newSlots, items: [] }])
    setNewName(''); setNewSlots(4); setAdding(false)
  }

  function updateContainer(updated) {
    onChange(containers.map(c => c.id === updated.id ? updated : c))
  }

  function deleteContainer(id) {
    onChange(containers.filter(c => c.id !== id))
  }

  return (
    <Section title={`Containers${containers.length > 0 ? ` (${containers.length})` : ''}`} defaultOpen={containers.length > 0}>
      {containers.map(c => (
        <ContainerCard key={c.id} container={c} onUpdate={updateContainer} onDelete={() => deleteContainer(c.id)} />
      ))}

      {adding ? (
        <div style={{ background: '#1c1917', border: '1px solid #d97706', borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            New Container
          </div>
          <input
            autoFocus value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addContainer()}
            placeholder="Name (e.g. Cart, Saddlebags, Chest…)"
            style={{ width: '100%', background: '#0c0a09', border: '1px solid #292524', borderRadius: 8, color: '#e7e5e4', fontSize: 14, padding: '10px 12px', outline: 'none', boxSizing: 'border-box', marginBottom: 10 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#78716c', flexShrink: 0 }}>Slots available:</span>
            <button onClick={() => setNewSlots(s => Math.max(1, s - 1))}
              style={{ width: 32, height: 32, background: '#292524', border: '1px solid #44403c', borderRadius: 6, color: '#a8a29e', fontSize: 18, cursor: 'pointer', display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#e7e5e4', minWidth: 28, textAlign: 'center' }}>{newSlots}</span>
            <button onClick={() => setNewSlots(s => Math.min(20, s + 1))}
              style={{ width: 32, height: 32, background: '#292524', border: '1px solid #44403c', borderRadius: 6, color: '#a8a29e', fontSize: 18, cursor: 'pointer', display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={addContainer}
              style={{ flex: 1, padding: '11px', background: '#d97706', border: 'none', borderRadius: 10, color: '#1c1917', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Add Container
            </button>
            <button onClick={() => setAdding(false)}
              style={{ padding: '11px 16px', background: 'transparent', border: '1px solid #44403c', borderRadius: 10, color: '#78716c', fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px dashed #44403c', borderRadius: 10, color: '#78716c', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          + Add Container / Mount / Vehicle
        </button>
      )}
    </Section>
  )
}

export default function CharacterSheetPage() {
  const { id } = useParams()
  const { getById, save, remove } = useCharacters()
  const navigate = useNavigate()
  const [char, setChar] = useState(() => getById(id))
  const [showCritModal, setShowCritModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const bg = getBackgroundById(char?.background)

  const update = useCallback((patch) => {
    setChar(prev => {
      const next = { ...prev, ...patch }
      save(next)
      return next
    })
  }, [save])

  if (!char) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#78716c' }}>
        Character not found.
        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '16px auto', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}>← Back</button>
      </div>
    )
  }

  const usedSlots = char.inventory?.reduce((sum, i) => sum + (i.isPetty ? 0 : (i.slots || 1)), 0) || 0
  const full = usedSlots >= 10

  function addMagicItem(type) {
    const newItem = { id: crypto.randomUUID(), name: '', ...(type === 'relic' ? { charges: 3, maxCharges: 3, recharge: '', effect: '' } : { spell: '' }) }
    if (type === 'spell') update({ spellbooks: [...(char.spellbooks || []), newItem] })
    else if (type === 'scroll') update({ scrolls: [...(char.scrolls || []), newItem] })
    else update({ relics: [...(char.relics || []), newItem] })
  }

  function updateMagicItem(type, updated) {
    if (type === 'spell') update({ spellbooks: char.spellbooks.map(i => i.id === updated.id ? updated : i) })
    else if (type === 'scroll') update({ scrolls: char.scrolls.map(i => i.id === updated.id ? updated : i) })
    else update({ relics: char.relics.map(i => i.id === updated.id ? updated : i) })
  }

  function deleteMagicItem(type, itemId) {
    if (type === 'spell') update({ spellbooks: char.spellbooks.filter(i => i.id !== itemId) })
    else if (type === 'scroll') update({ scrolls: char.scrolls.filter(i => i.id !== itemId) })
    else update({ relics: char.relics.filter(i => i.id !== itemId) })
  }

  function handleDelete() {
    remove(id)
    navigate('/')
  }

  return (
    <div style={{ background: '#0c0a09', minHeight: '100%' }}>
      <TopBar
        title={char.name || 'Character Sheet'}
        backTo="/"
        actions={
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{ background: 'none', border: 'none', color: '#57534e', cursor: 'pointer', padding: 8, minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}>
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
          </button>
        }
      />

      {/* Deprived banner */}
      {char.isDeprived && (
        <div style={{ background: '#431407', borderBottom: '1px solid #7c2d12', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#fb923c', fontWeight: 600 }}>⚠ Deprived — Cannot recover HP, attributes, or clear Fatigue</span>
        </div>
      )}
      {full && (
        <div style={{ background: '#450a0a', borderBottom: '1px solid #991b1b', padding: '10px 16px' }}>
          <span style={{ fontSize: 13, color: '#fca5a5', fontWeight: 600 }}>🔴 Inventory Full — HP reduced to 0!</span>
        </div>
      )}

      {/* Identity section */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <EditableText
            value={char.name}
            onChange={name => update({ name })}
            placeholder="Character name…"
            style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', border: 'none', background: 'transparent', padding: '4px 0', color: '#e7e5e4' }}
          />
          <div style={{ fontSize: 13, color: '#78716c', marginTop: 2, fontStyle: 'italic' }}>
            {bg?.name || char.background} {char.age ? `· Age ${char.age}` : ''}
          </div>

          {/* Deprived toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, cursor: 'pointer' }}>
            <div
              onClick={() => update({ isDeprived: !char.isDeprived })}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: char.isDeprived ? '#7c2d12' : '#292524',
                position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: char.isDeprived ? 22 : 2,
                width: 20, height: 20, borderRadius: 10,
                background: char.isDeprived ? '#fb923c' : '#57534e',
                transition: 'left 0.2s, background 0.2s'
              }} />
            </div>
            <span style={{ fontSize: 13, color: char.isDeprived ? '#fb923c' : '#57534e', fontWeight: 600 }}>
              Deprived
            </span>
          </label>
        </div>
      </div>

      {/* Stats */}
      <Section title="Core Stats">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <StatBox label="STR" stat={char.str} onChange={str => update({ str })} />
          <StatBox label="DEX" stat={char.dex} onChange={dex => update({ dex })} />
          <StatBox label="WIL" stat={char.wil} onChange={wil => update({ wil })} />
          <StatBox label="HP" stat={char.hp} onChange={hp => update({ hp })} accent />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Armor */}
          <div style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Armor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <button onClick={() => update({ armor: Math.max(0, (char.armor || 0) - 1) })} style={{ width: 32, height: 32, background: '#292524', border: '1px solid #44403c', borderRadius: 6, color: '#a8a29e', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#a8a29e', minWidth: 36, textAlign: 'center' }}>{char.armor || 0}</span>
              <button onClick={() => update({ armor: Math.min(3, (char.armor || 0) + 1) })} style={{ width: 32, height: 32, background: '#292524', border: '1px solid #44403c', borderRadius: 6, color: '#a8a29e', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <div style={{ fontSize: 10, color: '#44403c', textAlign: 'center', marginTop: 4 }}>max 3</div>
          </div>

          {/* Gold */}
          <div style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Gold (gp)</div>
            <input
              type="number"
              min={0}
              value={char.gold || 0}
              onChange={e => update({ gold: Math.max(0, parseInt(e.target.value, 10) || 0) })}
              style={{
                width: '100%', textAlign: 'center',
                background: '#0c0a09', border: '1px solid #292524',
                borderRadius: 8, color: '#fbbf24', fontSize: 24, fontWeight: 800,
                padding: '6px', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Crit damage button */}
        <button
          onClick={() => setShowCritModal(true)}
          style={{
            width: '100%', marginTop: 10, padding: '12px',
            background: 'transparent', border: '1px solid #7f1d1d',
            borderRadius: 10, color: '#f87171',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
        >
          💀 Roll Critical Damage Save (vs STR {char.str?.current})
        </button>
      </Section>

      {/* Background & Origins */}
      <Section title="Background & Origins" defaultOpen={false}>
        {/* Background description */}
        {bg?.description && (
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#a8a29e', lineHeight: 1.65, fontStyle: 'italic' }}>
            {bg.description}
          </p>
        )}

        {/* Table results */}
        {[1, 2].map(n => {
          const desc = char.backgroundTableDescriptions?.[`table${n}`]
          if (!desc?.text) return null
          return (
            <div key={n} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
                {desc.question || `Background Table ${n}`}
              </div>
              <div style={{ background: '#141211', border: '1px solid #292524', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#d6d3d1', lineHeight: 1.6 }}>
                {desc.text}
              </div>
            </div>
          )
        })}

        {/* Traits with labels */}
        {char.traits && Object.entries(char.traits).some(([,v]) => v) && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
              Character Traits
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {Object.entries(char.traits).filter(([,v]) => v).map(([key, val]) => (
                <div key={key} style={{ background: '#141211', border: '1px solid #292524', borderRadius: 8, padding: '9px 12px' }}>
                  <div style={{ fontSize: 10, color: '#57534e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div style={{ fontSize: 13, color: '#e7e5e4', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bond */}
        {char.bond?.text && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>Bond</div>
            <div style={{ background: '#141211', border: '1px solid #292524', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#a8a29e', lineHeight: 1.65 }}>
              {char.bond.text}
            </div>
          </div>
        )}

        {/* Omens */}
        {char.omens?.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>Omen</div>
            <div style={{ background: '#0d0d1a', border: '1px solid #1e1b4b', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#a5b4fc', lineHeight: 1.65, fontStyle: 'italic' }}>
              "{char.omens[0]}"
            </div>
          </div>
        )}
      </Section>

      {/* Inventory */}
      <Section title="Inventory">
        <InventoryGrid
          inventory={char.inventory || []}
          onChange={inventory => update({ inventory })}
        />
      </Section>

      {/* Containers */}
      <ContainersSection
        containers={char.containers || []}
        onChange={containers => update({ containers })}
      />

      {/* Magic */}
      <Section title="Magic" defaultOpen={false}>
        {/* Spellbooks */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Spellbooks (1 slot, adds Fatigue on cast)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(char.spellbooks || []).map(item => (
              <MagicItem key={item.id} item={item} type="spell" onEdit={u => updateMagicItem('spell', u)} onDelete={id => deleteMagicItem('spell', id)} />
            ))}
            <button onClick={() => addMagicItem('spell')} style={{ padding: '10px', background: 'transparent', border: '1px dashed #44403c', borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>+ Add Spellbook</button>
          </div>
        </div>

        {/* Scrolls */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Scrolls (petty, no Fatigue, single use)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(char.scrolls || []).map(item => (
              <MagicItem key={item.id} item={item} type="scroll" onEdit={u => updateMagicItem('scroll', u)} onDelete={id => deleteMagicItem('scroll', id)} />
            ))}
            <button onClick={() => addMagicItem('scroll')} style={{ padding: '10px', background: 'transparent', border: '1px dashed #44403c', borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>+ Add Scroll</button>
          </div>
        </div>

        {/* Relics */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Relics (limited charges, no Fatigue)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(char.relics || []).map(item => (
              <MagicItem key={item.id} item={item} type="relic" onEdit={u => updateMagicItem('relic', u)} onDelete={id => deleteMagicItem('relic', id)} />
            ))}
            <button onClick={() => addMagicItem('relic')} style={{ padding: '10px', background: 'transparent', border: '1px dashed #44403c', borderRadius: 8, color: '#78716c', fontSize: 13, cursor: 'pointer' }}>+ Add Relic</button>
          </div>
        </div>
      </Section>

      {/* Scars */}
      <Section title="Scars & History" defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(char.scars || []).map((scar, i) => (
            <div key={i} style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#a8a29e', flex: 1 }}>{scar}</span>
              <button onClick={() => update({ scars: char.scars.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#57534e', cursor: 'pointer', padding: 4, fontSize: 16, lineHeight: 1 }}>×</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Add scar or wound…"
              id="scar-input"
              style={{ flex: 1, padding: '10px 12px', background: '#1c1917', border: '1px solid #292524', borderRadius: 8, color: '#e7e5e4', fontSize: 13, outline: 'none' }}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  update({ scars: [...(char.scars || []), e.target.value.trim()] })
                  e.target.value = ''
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.getElementById('scar-input')
                if (input.value.trim()) {
                  update({ scars: [...(char.scars || []), input.value.trim()] })
                  input.value = ''
                }
              }}
              style={{ padding: '10px 14px', background: '#292524', border: '1px solid #44403c', borderRadius: 8, color: '#a8a29e', cursor: 'pointer', fontSize: 13 }}
            >
              Add
            </button>
          </div>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Notes" defaultOpen={false}>
        <EditableText
          value={char.notes || ''}
          onChange={notes => update({ notes })}
          placeholder="Tap to add notes…"
          multiline
          style={{ minHeight: 100 }}
        />
      </Section>

      <div style={{ height: 32 }} />

      {/* Crit damage modal */}
      {showCritModal && <CritDamageModal character={char} onClose={() => setShowCritModal(false)} />}

      {/* Delete confirm */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 }}>
          <div style={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 16, padding: 24, width: '100%', maxWidth: 320 }}>
            <h3 style={{ margin: '0 0 8px', color: '#e7e5e4' }}>Delete Character?</h3>
            <p style={{ margin: '0 0 20px', color: '#78716c', fontSize: 14 }}>
              This cannot be undone. <strong style={{ color: '#e7e5e4' }}>{char.name}</strong> will be gone forever.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, padding: '13px', background: 'transparent', border: '1px solid #44403c', borderRadius: 10, color: '#a8a29e', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '13px', background: '#7f1d1d', border: 'none', borderRadius: 10, color: '#fca5a5', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
