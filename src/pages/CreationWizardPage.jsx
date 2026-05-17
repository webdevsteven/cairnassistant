import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backgrounds } from '../data/backgrounds'
import WizardProgress from '../components/creation/WizardProgress'
import Step1Background from '../components/creation/Step1Background'
import Step2BackgroundTables from '../components/creation/Step2BackgroundTables'
import Step3Attributes from '../components/creation/Step3Attributes'
import Step4HP from '../components/creation/Step4HP'
import Step5Traits from '../components/creation/Step5Traits'
import Step6Bonds from '../components/creation/Step6Bonds'
import Step7Identity from '../components/creation/Step7Identity'
import { useCharacters, createEmptyCharacter } from '../hooks/useCharacters'

const TOTAL_STEPS = 7

export default function CreationWizardPage() {
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState(() => createEmptyCharacter())
  const { save } = useCharacters()
  const navigate = useNavigate()

  function canNext() {
    switch (step) {
      case 1: return !!draft.background
      case 2: return draft.backgroundChoices?.table1 !== null && draft.backgroundChoices?.table2 !== null
      case 3: return !!(draft.str?.current && draft.dex?.current && draft.wil?.current)
      case 4: return !!(draft.hp?.current)
      case 5: return true
      case 6: {
        const bondsList = draft.bonds || []
        const activeBg = backgrounds.find(b => b.id === draft.background)
        const needsTwoBonds = activeBg?.specialRule?.toLowerCase().includes('bonds twice') || draft.requiresExtraBond
        return needsTwoBonds ? bondsList.length >= 2 : bondsList.length >= 1
      }
      case 7: return !!(draft.name?.trim())
      default: return true
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    } else {
      handleSave()
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(s => s - 1)
      window.scrollTo(0, 0)
    } else {
      navigate('/')
    }
  }

  function handleSave() {
    const character = {
      ...draft,
      name: draft.name?.trim() || 'Unnamed',
      updatedAt: Date.now()
    }
    save(character)
    navigate(`/character/${character.id}`, { state: { isNew: true } })
  }

  const steps = [
    Step1Background,
    Step2BackgroundTables,
    Step3Attributes,
    Step4HP,
    Step5Traits,
    Step6Bonds,
    Step7Identity
  ]
  const StepComponent = steps[step - 1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: '#0c0a09' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px',
        background: '#1c1917',
        borderBottom: '1px solid #292524'
      }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none', border: 'none', color: '#d97706',
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
            padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center', gap: 4,
            minHeight: 44, minWidth: 44
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <h1 style={{ flex: 1, margin: 0, textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#e7e5e4' }}>
          Create Character
        </h1>
        <div style={{ width: 60 }}/>
      </div>

      {/* Progress */}
      <WizardProgress step={step} total={TOTAL_STEPS} />

      {/* Step content */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 100 }}>
        <div className="fade-in" key={step}>
          <StepComponent draft={draft} setDraft={setDraft} />
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: '#1c1917',
        borderTop: '1px solid #292524',
        padding: '12px 16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        display: 'flex', gap: 10
      }}>
        {step > 1 && (
          <button
            onClick={handleBack}
            style={{
              flex: '0 0 auto',
              padding: '14px 20px',
              background: 'transparent',
              border: '1px solid #44403c',
              borderRadius: 12,
              color: '#a8a29e',
              fontSize: 15, fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canNext()}
          style={{
            flex: 1,
            padding: '14px',
            background: canNext() ? '#d97706' : '#292524',
            border: 'none',
            borderRadius: 12,
            color: canNext() ? '#1c1917' : '#57534e',
            fontSize: 16, fontWeight: 700,
            cursor: canNext() ? 'pointer' : 'default',
            transition: 'background 0.2s, color 0.2s',
            boxShadow: canNext() ? '0 2px 12px rgba(217,119,6,0.25)' : 'none'
          }}
        >
          {step === TOTAL_STEPS ? '✓ Create Character' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
