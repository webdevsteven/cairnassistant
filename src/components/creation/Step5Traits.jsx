import { traits, traitLabels } from '../../data/traits'
import { rollD10 } from '../../utils/dice'

export default function Step5Traits({ draft, setDraft }) {
  const traitKeys = Object.keys(traits)

  function rollAll() {
    const rolled = {}
    traitKeys.forEach(key => {
      rolled[key] = traits[key][(rollD10() - 1)]
    })
    setDraft(prev => ({ ...prev, traits: rolled }))
  }

  function rollOne(key) {
    const val = traits[key][(rollD10() - 1)]
    setDraft(prev => ({ ...prev, traits: { ...prev.traits, [key]: val } }))
  }

  function setTrait(key, val) {
    setDraft(prev => ({ ...prev, traits: { ...prev.traits, [key]: val } }))
  }

  const currentTraits = draft.traits || {}

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Roll d10 for each trait, or choose from the list. These describe your character's appearance and personality.
      </p>

      <button
        onClick={rollAll}
        style={{
          width: '100%', padding: '13px',
          background: '#d97706', border: 'none', borderRadius: 12,
          color: '#1c1917', fontWeight: 700, fontSize: 16,
          cursor: 'pointer', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}
      >
        🎲 Roll All Traits
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {traitKeys.map(key => (
          <div key={key} style={{
            background: '#1c1917', border: '1px solid #292524',
            borderRadius: 12, padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#e7e5e4' }}>
                {traitLabels[key]}
              </span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {currentTraits[key] && (
                  <span style={{
                    fontSize: 13, fontWeight: 700, color: '#d97706',
                    background: '#1c0a00', padding: '4px 10px', borderRadius: 8
                  }}>
                    {currentTraits[key]}
                  </span>
                )}
                <button
                  onClick={() => rollOne(key)}
                  style={{
                    padding: '5px 10px', background: 'transparent',
                    border: '1px solid #44403c', borderRadius: 6,
                    color: '#78716c', fontSize: 12, cursor: 'pointer', fontWeight: 600
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {traits[key].map(option => (
                <button
                  key={option}
                  onClick={() => setTrait(key, option)}
                  style={{
                    padding: '5px 10px',
                    background: currentTraits[key] === option ? '#292524' : 'transparent',
                    border: `1px solid ${currentTraits[key] === option ? '#d97706' : '#292524'}`,
                    borderRadius: 8,
                    color: currentTraits[key] === option ? '#f59e0b' : '#78716c',
                    fontSize: 12, cursor: 'pointer', fontWeight: 500,
                    transition: 'all 0.15s'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
