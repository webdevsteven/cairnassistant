import { useState } from 'react'
import { traits, traitLabels } from '../../data/traits'
import { rollD10 } from '../../utils/dice'

const traitHints = {
  physique: 'Body type and physical build',
  skin: 'Complexion and skin characteristics',
  hair: 'Hair style and color',
  face: 'Distinctive facial features',
  clothing: 'How you dress and present yourself',
  virtue: 'A positive quality you embody',
  vice: 'A personal flaw or weakness',
  speech: 'How you speak and communicate',
}

export default function Step5Traits({ draft, setDraft }) {
  const [expanded, setExpanded] = useState({})
  const traitKeys = Object.keys(traits)
  const currentTraits = draft.traits || {}
  const allRolled = traitKeys.every(k => currentTraits[k])

  function rollAll() {
    const rolled = {}
    traitKeys.forEach(key => {
      rolled[key] = traits[key][(rollD10() - 1)]
    })
    setDraft(prev => ({ ...prev, traits: rolled }))
    // Collapse all after rolling
    const collapsed = {}
    traitKeys.forEach(k => { collapsed[k] = false })
    setExpanded(collapsed)
  }

  function rollOne(key) {
    const val = traits[key][(rollD10() - 1)]
    setDraft(prev => ({ ...prev, traits: { ...prev.traits, [key]: val } }))
    setExpanded(prev => ({ ...prev, [key]: false }))
  }

  function setTrait(key, val) {
    setDraft(prev => ({ ...prev, traits: { ...prev.traits, [key]: val } }))
    setExpanded(prev => ({ ...prev, [key]: false }))
  }

  function toggleExpand(key) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <p style={{ margin: '0 0 16px', color: '#a8a29e', fontSize: 14, lineHeight: 1.5 }}>
        Roll d10 for each trait or choose from the list. These describe your character's appearance and personality.
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
        🎲 {allRolled ? 'Re-roll All Traits' : 'Roll All Traits'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {traitKeys.map(key => {
          const selected = currentTraits[key]
          const isOpen = expanded[key] || !selected

          return (
            <div key={key} style={{
              background: '#1c1917',
              border: `1px solid ${selected ? '#292524' : '#44403c'}`,
              borderRadius: 12,
              overflow: 'hidden'
            }}>
              {/* Header row — always visible */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e7e5e4' }}>
                    {traitLabels[key]}
                  </div>
                  {!isOpen && (
                    <div style={{ fontSize: 11, color: '#57534e', marginTop: 1 }}>
                      {traitHints[key]}
                    </div>
                  )}
                </div>

                {selected && !isOpen ? (
                  <>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: '#d97706',
                      background: '#1c0a00', padding: '4px 10px', borderRadius: 8
                    }}>
                      {selected}
                    </span>
                    <button
                      onClick={() => toggleExpand(key)}
                      style={{
                        padding: '5px 10px', background: 'transparent',
                        border: '1px solid #44403c', borderRadius: 6,
                        color: '#78716c', fontSize: 12, cursor: 'pointer', fontWeight: 600
                      }}
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <>
                    {selected && (
                      <span style={{
                        fontSize: 13, fontWeight: 700, color: '#d97706',
                        background: '#1c0a00', padding: '4px 10px', borderRadius: 8
                      }}>
                        {selected}
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
                    {selected && (
                      <button
                        onClick={() => toggleExpand(key)}
                        style={{
                          padding: '5px 10px', background: 'transparent',
                          border: '1px solid #44403c', borderRadius: 6,
                          color: '#78716c', fontSize: 12, cursor: 'pointer', fontWeight: 600
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Options grid — only when expanded */}
              {isOpen && (
                <div style={{ padding: '0 14px 12px' }}>
                  <div style={{ fontSize: 11, color: '#57534e', marginBottom: 8 }}>
                    {traitHints[key]}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {traits[key].map(option => (
                      <button
                        key={option}
                        onClick={() => setTrait(key, option)}
                        style={{
                          padding: '5px 10px',
                          background: selected === option ? '#292524' : 'transparent',
                          border: `1px solid ${selected === option ? '#d97706' : '#292524'}`,
                          borderRadius: 8,
                          color: selected === option ? '#f59e0b' : '#78716c',
                          fontSize: 12, cursor: 'pointer', fontWeight: 500,
                          transition: 'all 0.15s'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
