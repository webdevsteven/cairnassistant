const STEP_LABELS = ['Background', 'Tables', 'Attributes', 'HP', 'Traits', 'Bond', 'Identity']

export default function WizardProgress({ step, total = 7 }) {
  return (
    <div style={{
      background: '#1c1917',
      borderBottom: '1px solid #292524',
      padding: '12px 16px 14px'
    }}>
      {/* Step label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#78716c', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Step {step} of {total}
        </span>
        <span style={{ fontSize: 13, color: '#d97706', fontWeight: 700 }}>
          {STEP_LABELS[step - 1]}
        </span>
      </div>
      {/* Dots */}
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              flex: i < step ? 1 : '0 0 8px',
              height: 4,
              borderRadius: 2,
              background: i < step ? '#d97706' : '#292524',
              transition: 'background 0.3s, flex 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  )
}
