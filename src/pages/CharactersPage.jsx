import { useNavigate } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import CharacterCard from '../components/character/CharacterCard'

export default function CharactersPage() {
  const { characters } = useCharacters()
  const navigate = useNavigate()

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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
              {/* Cairn cairn icon */}
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
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 12px rgba(217,119,6,0.3)'
            }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Content */}
      {sorted.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh',
          padding: '40px 24px', textAlign: 'center'
        }}>
          {/* Empty state illustration */}
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
              padding: '16px 32px',
              background: '#d97706',
              border: 'none',
              borderRadius: 16,
              color: '#1c1917',
              fontWeight: 800,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(217,119,6,0.35)',
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
    </div>
  )
}
