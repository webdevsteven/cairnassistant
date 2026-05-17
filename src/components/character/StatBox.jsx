import { useState, useRef } from 'react'

export default function StatBox({ label, stat, onChange, accent = false, danger = false }) {
  const [editingCurrent, setEditingCurrent] = useState(false)
  const [editingMax, setEditingMax] = useState(false)
  const [tempVal, setTempVal] = useState('')
  const inputRef = useRef(null)

  const pct = stat.max > 0 ? stat.current / stat.max : 0
  const low = pct <= 0.4 && pct > 0
  const critical = stat.current === 0

  const barColor = critical ? '#dc2626' : low ? '#ea580c' : accent ? '#d97706' : '#22c55e'

  function startEditCurrent() {
    setTempVal(String(stat.current))
    setEditingCurrent(true)
    setTimeout(() => inputRef.current?.select(), 10)
  }

  function startEditMax() {
    setTempVal(String(stat.max))
    setEditingMax(true)
    setTimeout(() => inputRef.current?.select(), 10)
  }

  function commitEdit(field) {
    const num = parseInt(tempVal, 10)
    if (!isNaN(num) && num >= 0) {
      if (field === 'current') {
        onChange({ ...stat, current: Math.min(num, stat.max) })
      } else {
        onChange({ ...stat, max: num, current: Math.min(stat.current, num) })
      }
    }
    setEditingCurrent(false)
    setEditingMax(false)
  }

  function adjust(delta) {
    const next = Math.max(0, Math.min(stat.max, stat.current + delta))
    onChange({ ...stat, current: next })
  }

  return (
    <div style={{
      background: '#1c1917',
      border: `1px solid ${critical ? '#7f1d1d' : danger ? '#7f1d1d' : '#292524'}`,
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      transition: 'border-color 0.2s'
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#78716c', textTransform: 'uppercase' }}>
        {label}
      </div>

      {/* Bar */}
      <div style={{ height: 3, background: '#292524', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${Math.max(0, Math.min(100, pct * 100))}%`,
          background: barColor,
          borderRadius: 2,
          transition: 'width 0.3s, background-color 0.3s'
        }} />
      </div>

      {/* Values row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
        {/* Minus */}
        <button
          onClick={() => adjust(-1)}
          style={{
            width: 36, height: 36,
            background: '#292524',
            border: '1px solid #44403c',
            borderRadius: 8,
            color: '#a8a29e',
            fontSize: 20,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}
        >−</button>

        {/* Current / Max */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flex: 1, justifyContent: 'center' }}>
          {editingCurrent ? (
            <input
              ref={inputRef}
              type="number"
              value={tempVal}
              onChange={e => setTempVal(e.target.value)}
              onBlur={() => commitEdit('current')}
              onKeyDown={e => { if (e.key === 'Enter') commitEdit('current') }}
              style={{
                width: 52, textAlign: 'center', background: '#292524',
                border: '1px solid #d97706', borderRadius: 6,
                color: '#e7e5e4', fontSize: 24, fontWeight: 700, padding: '2px 4px'
              }}
            />
          ) : (
            <button
              onClick={startEditCurrent}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: critical ? '#dc2626' : low ? '#f97316' : '#e7e5e4',
                fontSize: 28, fontWeight: 800, lineHeight: 1,
                padding: '2px 4px', borderRadius: 4,
                minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {stat.current}
            </button>
          )}

          <span style={{ color: '#57534e', fontSize: 18 }}>/</span>

          {editingMax ? (
            <input
              ref={editingCurrent ? null : inputRef}
              type="number"
              value={tempVal}
              onChange={e => setTempVal(e.target.value)}
              onBlur={() => commitEdit('max')}
              onKeyDown={e => { if (e.key === 'Enter') commitEdit('max') }}
              style={{
                width: 44, textAlign: 'center', background: '#292524',
                border: '1px solid #d97706', borderRadius: 6,
                color: '#78716c', fontSize: 16, fontWeight: 500, padding: '2px 4px'
              }}
            />
          ) : (
            <button
              onClick={startEditMax}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#78716c', fontSize: 16, fontWeight: 500,
                padding: '2px 4px', borderRadius: 4,
                minHeight: 32, display: 'flex', alignItems: 'center'
              }}
            >
              {stat.max}
            </button>
          )}
        </div>

        {/* Plus */}
        <button
          onClick={() => adjust(1)}
          style={{
            width: 36, height: 36,
            background: '#292524',
            border: '1px solid #44403c',
            borderRadius: 8,
            color: '#a8a29e',
            fontSize: 20,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}
        >+</button>
      </div>
    </div>
  )
}
