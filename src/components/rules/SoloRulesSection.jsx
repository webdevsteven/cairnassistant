import { useState } from 'react'

function SoloTable({ table }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: 10, marginBottom: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} style={{
                padding: '7px 10px',
                background: '#0c0a09',
                color: '#d97706',
                fontWeight: 700,
                textAlign: 'left',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #292524',
                whiteSpace: 'nowrap',
                ...(i === 0 ? { width: '15%' } : {})
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : '#0c0a0966' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '8px 10px',
                  color: ci === 0 ? '#e7e5e4' : '#a8a29e',
                  fontWeight: ci === 0 ? 700 : 400,
                  borderBottom: ri < table.rows.length - 1 ? '1px solid #1c1917' : 'none',
                  fontSize: 13,
                  lineHeight: 1.5,
                  verticalAlign: 'top',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SoloItems({ items }) {
  return (
    <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{
            flexShrink: 0, marginTop: 4,
            width: 6, height: 6, borderRadius: '50%',
            background: '#d97706', display: 'inline-block'
          }} />
          <span style={{ fontSize: 13, color: '#a8a29e', lineHeight: 1.6 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function SoloRulesSection({ section, searchQuery, forceOpen }) {
  const [open, setOpen] = useState(false)
  const isOpen = open || forceOpen

  const q = searchQuery?.toLowerCase() || ''

  function textMatches(text) {
    return text?.toLowerCase().includes(q)
  }

  function sectionMatches() {
    if (!q) return true
    if (textMatches(section.title)) return true
    return section.subsections.some(s =>
      textMatches(s.title) ||
      textMatches(s.content) ||
      s.items?.some(item => textMatches(item)) ||
      s.table?.headers?.some(h => textMatches(h)) ||
      s.table?.rows?.some(row => row.some(cell => textMatches(cell)))
    )
  }

  if (q && !sectionMatches()) return null

  function highlight(text) {
    if (!q || !text) return text
    const parts = text.split(new RegExp(`(${escapeRegex(q)})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase()
        ? <mark key={i} style={{ background: '#854d0e', color: '#fde68a', borderRadius: 2, padding: '0 2px' }}>{part}</mark>
        : part
    )
  }

  function subMatches(sub) {
    if (!q) return true
    return textMatches(sub.title) ||
      textMatches(sub.content) ||
      sub.items?.some(item => textMatches(item)) ||
      sub.table?.headers?.some(h => textMatches(h)) ||
      sub.table?.rows?.some(row => row.some(cell => textMatches(cell)))
  }

  return (
    <div style={{
      background: '#1c1917',
      border: `1px solid ${isOpen ? '#44403c' : '#292524'}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.2s'
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', textAlign: 'left'
        }}
      >
        <span style={{ fontSize: 20 }}>{section.icon}</span>
        <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: isOpen ? '#f59e0b' : '#e7e5e4', transition: 'color 0.2s' }}>
          {highlight(section.title)}
        </span>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
          style={{ width: 18, height: 18, color: '#78716c', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <div style={{ borderTop: '1px solid #292524' }}>
          {section.subsections.map((sub, i) => {
            if (!subMatches(sub)) return null
            return (
              <div
                key={i}
                style={{
                  padding: '16px 18px',
                  borderBottom: i < section.subsections.length - 1 ? '1px solid #1c1917' : 'none',
                  background: i % 2 === 0 ? '#1a1917' : '#161513'
                }}
              >
                <h3 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {highlight(sub.title)}
                </h3>
                {sub.content && (
                  <div style={{ fontSize: 14, color: '#a8a29e', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {highlight(sub.content)}
                  </div>
                )}
                {sub.table && <SoloTable table={sub.table} />}
                {sub.items && <SoloItems items={sub.items} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
