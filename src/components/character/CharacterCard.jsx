import { Link } from 'react-router-dom'

export default function CharacterCard({ character }) {
  const { id, name, background, str, dex, wil, hp, armor, isDeprived, inventory } = character
  const usedSlots = inventory?.reduce((sum, item) => sum + (item.isPetty ? 0 : (item.slots || 1)), 0) || 0
  const full = usedSlots >= 10

  const statLow = (s) => s.max > 0 && s.current / s.max <= 0.4

  return (
    <Link to={`/character/${id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#1c1917',
        border: `1px solid ${isDeprived ? '#7c2d12' : '#292524'}`,
        borderRadius: 16,
        padding: '16px',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'pointer'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#e7e5e4', lineHeight: 1.2 }}>
              {name || 'Unnamed'}
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: 13, color: '#78716c', fontStyle: 'italic' }}>
              {background || 'No background'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {isDeprived && (
              <span style={{ padding: '3px 8px', background: '#431407', border: '1px solid #7c2d12', borderRadius: 12, fontSize: 10, fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Deprived
              </span>
            )}
            {full && (
              <span style={{ padding: '3px 8px', background: '#450a0a', border: '1px solid #991b1b', borderRadius: 12, fontSize: 10, fontWeight: 700, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full!
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { label: 'STR', stat: str },
            { label: 'DEX', stat: dex },
            { label: 'WIL', stat: wil },
            { label: 'HP', stat: hp },
            { label: 'ARM', stat: null, value: armor },
          ].map(({ label, stat, value }) => {
            const low = stat && statLow(stat)
            return (
              <div key={label} style={{
                background: '#0c0a09',
                borderRadius: 8,
                padding: '8px 4px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#57534e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 800,
                  color: low ? '#f97316' : label === 'ARM' ? '#a8a29e' : '#e7e5e4'
                }}>
                  {stat ? stat.current : value}
                </div>
                {stat && (
                  <div style={{ fontSize: 10, color: '#44403c' }}>/{stat.max}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Inventory bar */}
        <div style={{ marginTop: 12 }}>
          <div style={{ height: 3, background: '#292524', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, usedSlots / 10 * 100)}%`,
              background: full ? '#dc2626' : usedSlots >= 8 ? '#f97316' : '#22c55e',
              borderRadius: 2,
              transition: 'width 0.3s'
            }} />
          </div>
          <div style={{ fontSize: 10, color: '#44403c', marginTop: 4 }}>{usedSlots}/10 inventory slots</div>
        </div>
      </div>
    </Link>
  )
}
