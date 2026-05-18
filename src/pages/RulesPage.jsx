import { useState } from 'react'
import { rulesData as rules } from '../data/rules'
import { soloRulesData } from '../data/soloRules'
import RulesSection from '../components/rules/RulesSection'
import SoloRulesSection from '../components/rules/SoloRulesSection'

export default function RulesPage() {
  const [tab, setTab] = useState('core')
  const [query, setQuery] = useState('')
  const forceOpen = query.length > 1

  const filteredCore = query.length > 1
    ? rules.filter(section =>
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.subsections.some(s =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.content.toLowerCase().includes(query.toLowerCase())
        )
      )
    : rules

  const filteredSolo = query.length > 1
    ? soloRulesData.filter(section =>
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.subsections.some(s => {
          const q = query.toLowerCase()
          return s.title?.toLowerCase().includes(q) ||
            s.content?.toLowerCase().includes(q) ||
            s.items?.some(item => item.toLowerCase().includes(q)) ||
            s.table?.rows?.some(row => row.some(cell => cell.toLowerCase().includes(q)))
        })
      )
    : soloRulesData

  const isSolo = tab === 'solo'
  const filteredSections = isSolo ? filteredSolo : filteredCore
  const noResults = filteredSections.length === 0

  return (
    <div style={{ minHeight: '100%', background: '#0c0a09' }}>
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#0c0a09',
        borderBottom: '1px solid #1c1917',
        padding: '16px 16px 0'
      }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#e7e5e4', letterSpacing: '-0.02em' }}>
          Rules Reference
        </h1>

        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: 4,
          background: '#1c1917', borderRadius: 10,
          padding: 4, marginBottom: 12
        }}>
          {[
            { key: 'core', label: 'Core Rules' },
            { key: 'solo', label: 'Solo Rules' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setQuery('') }}
              style={{
                flex: 1, padding: '9px',
                background: tab === key ? '#d97706' : 'transparent',
                border: 'none', borderRadius: 8,
                color: tab === key ? '#1c1917' : '#78716c',
                fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', paddingBottom: 12 }}>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 18, height: 18, color: '#57534e', pointerEvents: 'none',
              marginTop: -6
            }}
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            placeholder={`Search ${isSolo ? 'solo rules' : 'rules'}…`}
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
                padding: 4, display: 'flex', alignItems: 'center', marginTop: -6
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {query.length > 1 && (
          <div style={{ paddingBottom: 8, fontSize: 12, color: '#78716c' }}>
            {noResults
              ? 'No results found'
              : `${filteredSections.length} section${filteredSections.length !== 1 ? 's' : ''} match`}
          </div>
        )}
      </div>

      {/* Solo tab intro banner */}
      {isSolo && !query && (
        <div style={{
          margin: '12px 14px 0',
          padding: '12px 16px',
          background: '#0d0d1a',
          border: '1px solid #1e1b4b',
          borderRadius: 12
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', marginBottom: 4 }}>
            Solo Cairn
          </div>
          <p style={{ margin: 0, fontSize: 12, color: '#6366f1', lineHeight: 1.6 }}>
            A complete solo ruleset for Cairn 2e — the Oracle, faction management, exploration loops, growth, and session structure. Core rules from the Player's Guide apply unchanged.
          </p>
        </div>
      )}

      {/* Sections */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
        {noResults ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '60px 24px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.4 }}>📜</div>
            <p style={{ margin: 0, fontSize: 15, color: '#57534e' }}>
              No rules found for "{query}"
            </p>
          </div>
        ) : isSolo ? (
          filteredSolo.map(section => (
            <SoloRulesSection
              key={section.id}
              section={section}
              searchQuery={query}
              forceOpen={forceOpen}
            />
          ))
        ) : (
          filteredCore.map(section => (
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
