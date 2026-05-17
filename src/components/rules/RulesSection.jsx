import { useState } from 'react'

export default function RulesSection({ section, searchQuery, forceOpen }) {
  const [open, setOpen] = useState(false)
  const isOpen = open || forceOpen

  const q = searchQuery?.toLowerCase() || ''
  const matches = q && (
    section.title.toLowerCase().includes(q) ||
    section.subsections.some(s =>
      s.title.toLowerCase().includes(q) ||
      s.content.toLowerCase().includes(q)
    )
  )

  if (q && !matches) return null

  function highlight(text) {
    if (!q) return text
    const idx = text.toLowerCase().indexOf(q)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: '#854d0e', color: '#fde68a', borderRadius: 2, padding: '0 2px' }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <div style={{
      background: '#1c1917',
      border: `1px solid ${isOpen ? '#44403c' : '#292524'}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.2s'
    }}>
      {/* Header */}
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

      {/* Content */}
      {isOpen && (
        <div style={{ borderTop: '1px solid #292524' }}>
          {section.subsections.map((sub, i) => {
            const subMatch = !q || sub.title.toLowerCase().includes(q) || sub.content.toLowerCase().includes(q)
            if (!subMatch) return null
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
                <div style={{ fontSize: 14, color: '#a8a29e', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {q ? highlightText(sub.content, q) : sub.content}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function highlightText(text, query) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: '#854d0e', color: '#fde68a', borderRadius: 2, padding: '0 2px' }}>{part}</mark>
      : part
  )
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
