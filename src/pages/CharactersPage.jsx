import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import CharacterCard from '../components/character/CharacterCard'

// ── Settings Modal ────────────────────────────────────────────────────────────
function SettingsModal({ characters, onSave, onClose }) {
  const fileRef = useRef(null)
  const [importStatus, setImportStatus] = useState(null)

  function exportCharacter(character) {
    const data = JSON.stringify(character, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(character.name || 'unnamed').replace(/[^a-z0-9_\-]/gi, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportAll() {
    const data = JSON.stringify(characters, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cairn-backup-${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        let parsed = JSON.parse(ev.target.result)
        const list = Array.isArray(parsed) ? parsed : [parsed]
        let count = 0
        for (const c of list) {
          if (c && typeof c === 'object' && c.id) {
            onSave({ ...c, updatedAt: Date.now() })
            count++
          }
        }
        setImportStatus(count > 0
          ? { ok: true, msg: `Imported ${count} character${count !== 1 ? 's' : ''}` }
          : { ok: false, msg: 'No valid characters found in file' }
        )
      } catch {
        setImportStatus({ ok: false, msg: 'Could not read file — invalid JSON' })
      }
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 80, backdropFilter: 'blur(2px)'
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 90, background: '#1c1917',
        borderTop: '1px solid #44403c',
        borderRadius: '20px 20px 0 0',
        padding: '20px 20px max(20px, env(safe-area-inset-bottom))',
        maxHeight: '85dvh', overflowY: 'auto',
        animation: 'slideUp 0.25s ease'
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: '#44403c', borderRadius: 2, margin: '0 auto 20px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#e7e5e4' }}>Settings</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: 20, padding: 4 }}
          >✕</button>
        </div>

        {/* Import/Export section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#57534e',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12
          }}>
            Data Transfer
          </div>

          <p style={{ margin: '0 0 14px', fontSize: 13, color: '#78716c', lineHeight: 1.5 }}>
            Export characters as JSON files to back them up or move them to another device. Import a previously exported file to restore.
          </p>

          {/* Import button */}
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => { setImportStatus(null); fileRef.current?.click() }}
            style={{
              width: '100%', padding: '13px',
              background: 'transparent',
              border: '1px solid #44403c',
              borderRadius: 12, color: '#a8a29e',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Import Character File
          </button>

          {importStatus && (
            <div style={{
              padding: '10px 14px', borderRadius: 10, marginBottom: 10,
              background: importStatus.ok ? '#052e16' : '#450a0a',
              border: `1px solid ${importStatus.ok ? '#16a34a' : '#dc2626'}`,
              color: importStatus.ok ? '#86efac' : '#fca5a5',
              fontSize: 13, fontWeight: 600
            }}>
              {importStatus.msg}
            </div>
          )}

          {characters.length > 1 && (
            <button
              onClick={exportAll}
              style={{
                width: '100%', padding: '13px',
                background: 'transparent',
                border: '1px solid #44403c',
                borderRadius: 12, color: '#a8a29e',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export All Characters
            </button>
          )}
        </div>

        {/* Per-character exports */}
        {characters.length > 0 && (
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#57534e',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12
            }}>
              Export Individual Character
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[...characters].sort((a,b) => b.updatedAt - a.updatedAt).map(c => (
                <div
                  key={c.id}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '12px 14px', background: '#141211',
                    border: '1px solid #292524', borderRadius: 10
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e7e5e4' }}>{c.name || 'Unnamed'}</div>
                    <div style={{ fontSize: 11, color: '#57534e', marginTop: 1 }}>
                      {(c.name || 'unnamed').replace(/[^a-z0-9_\-]/gi, '_')}.json
                    </div>
                  </div>
                  <button
                    onClick={() => exportCharacter(c)}
                    style={{
                      padding: '7px 14px',
                      background: 'transparent',
                      border: '1px solid #44403c',
                      borderRadius: 8, color: '#d97706',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CharactersPage() {
  const { characters, save } = useCharacters()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false)

  const sorted = [...characters].sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <div style={{ minHeight: '100%', background: '#0c0a09' }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        background: '#0c0a09',
        borderBottom: characters.length > 0 ? '1px solid #1c1917' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
              <svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }} fill="none">
                <ellipse cx="16" cy="27" rx="10" ry="3.5" fill="#78716c"/>
                <rect x="6" y="23.5" width="20" height="3.5" fill="#78716c"/>
                <ellipse cx="16" cy="19.5" rx="7.5" ry="3" fill="#a8a29e"/>
                <rect x="8.5" y="16.5" width="15" height="3" fill="#a8a29e"/>
                <ellipse cx="16" cy="13.5" rx="5.5" ry="2.5" fill="#d6d3d1"/>
                <rect x="10.5" y="11" width="11" height="2.5" fill="#d6d3d1"/>
                <ellipse cx="16" cy="9" rx="4" ry="2" fill="#f59e0b"/>
                <rect x="12" y="7" width="8" height="2" fill="#f59e0b"/>
                <ellipse cx="16" cy="6.5" rx="2.5" ry="1.5" fill="#fbbf24"/>
              </svg>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#e7e5e4', letterSpacing: '-0.02em' }}>
                Cairn
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: '#57534e', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
              Companion
            </p>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Settings gear */}
            <button
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
              style={{
                width: 42, height: 42,
                background: 'transparent',
                border: '1px solid #292524',
                borderRadius: 11,
                color: '#78716c',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.15s, color 0.15s'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </button>

            {/* New character */}
            <button
              onClick={() => navigate('/create')}
              style={{
                padding: '11px 20px',
                background: '#d97706',
                border: 'none',
                borderRadius: 12,
                color: '#1c1917',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: '0 2px 12px rgba(217,119,6,0.3)'
              }}
            >
              + New
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {sorted.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh',
          padding: '40px 24px', textAlign: 'center'
        }}>
          <svg viewBox="0 0 80 80" style={{ width: 80, height: 80, marginBottom: 24, opacity: 0.4 }} fill="none">
            <ellipse cx="40" cy="65" rx="24" ry="7" fill="#78716c"/>
            <rect x="16" y="58" width="48" height="7" fill="#78716c"/>
            <ellipse cx="40" cy="49" rx="18" ry="6" fill="#a8a29e"/>
            <rect x="22" y="43" width="36" height="6" fill="#a8a29e"/>
            <ellipse cx="40" cy="35" rx="13" ry="5" fill="#d6d3d1"/>
            <rect x="27" y="30" width="26" height="5" fill="#d6d3d1"/>
            <ellipse cx="40" cy="23" rx="9" ry="4" fill="#f59e0b"/>
            <rect x="31" y="19" width="18" height="4" fill="#f59e0b"/>
            <ellipse cx="40" cy="17" rx="5.5" ry="3" fill="#fbbf24"/>
          </svg>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#78716c' }}>
            No characters yet
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 15, color: '#57534e', lineHeight: 1.6, maxWidth: 260 }}>
            Begin your journey into the Wood. Create your first character to get started.
          </p>
          <button
            onClick={() => navigate('/create')}
            style={{
              padding: '16px 32px', background: '#d97706', border: 'none',
              borderRadius: 16, color: '#1c1917', fontWeight: 800, fontSize: 17,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(217,119,6,0.35)',
              letterSpacing: '-0.01em'
            }}
          >
            Create Character
          </button>
        </div>
      ) : (
        <div style={{ padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: '#57534e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: 2 }}>
            {sorted.length} {sorted.length === 1 ? 'character' : 'characters'}
          </div>
          {sorted.map(c => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      )}

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          characters={characters}
          onSave={save}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
