import { useState } from 'react'
import { rulesData as rules } from '../data/rules'
import RulesSection from '../components/rules/RulesSection'

export default function RulesPage() {
  const [query, setQuery] = useState('')
  const forceOpen = query.length > 1

  const filteredRules = query.length > 1
    ? rules.filter(section =>
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.subsections.some(s =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.content.toLowerCase().includes(query.toLowerCase())
        )
      )
    : rules

  return (
    <div style={{ minHeight: '100%', background: '#0c0a09' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#0c0a09',
        borderBottom: '1px solid #1c1917',
        padding: '16px 16px 12px'
      }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#e7e5e4', letterSpacing: '-0.02em' }}>
          Rules Reference
        </h1>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 18, height: 18, color: '#57534e', pointerEvents: 'none'
            }}
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            placeholder="Search rules…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 40px',
              background: '#1c1917',
              border: '1px solid #292524',
              borderRadius: 12,
              color: '#e7e5e4',
              fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box',
              WebkitAppearance: 'none'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#78716c', cursor: 'pointer',
                padding: 4, display: 'flex', alignItems: 'center'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Result count when searching */}
        {query.length > 1 && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#78716c' }}>
            {filteredRules.length === 0
              ? 'No results found'
              : `${filteredRules.length} section${filteredRules.length !== 1 ? 's' : ''} match`}
          </div>
        )}
      </div>

      {/* Rules sections */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
        {filteredRules.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '60px 24px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.4 }}>📜</div>
            <p style={{ margin: 0, fontSize: 15, color: '#57534e' }}>
              No rules found for "{query}"
            </p>
          </div>
        ) : (
          filteredRules.map(section => (
            <RulesSection
              key={section.id}
              section={section}
              searchQuery={query}
              forceOpen={forceOpen}
            />
          ))
        )}
      </div>
    </div>
  )
}
