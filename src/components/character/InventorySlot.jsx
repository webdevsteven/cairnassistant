export default function InventorySlot({ item, onEdit, onAdd, index }) {
  if (!item) {
    return (
      <button
        onClick={onAdd}
        style={{
          background: 'transparent',
          border: '1.5px dashed #44403c',
          borderRadius: 8,
          padding: '10px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#44403c',
          fontSize: 20,
          minHeight: 44,
          transition: 'border-color 0.15s, color 0.15s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#78716c'
          e.currentTarget.style.color = '#78716c'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#44403c'
          e.currentTarget.style.color = '#44403c'
        }}
        aria-label={`Add item to slot ${index + 1}`}
      >
        +
      </button>
    )
  }

  const isFatigue = item.isFatigue
  const isBulky = item.slots === 2
  const isPetty = item.isPetty

  return (
    <button
      onClick={() => onEdit(item)}
      style={{
        background: isFatigue ? '#431407' : '#1c1917',
        border: `1.5px solid ${isFatigue ? '#7c2d12' : '#292524'}`,
        borderRadius: 8,
        padding: '8px 10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 3,
        textAlign: 'left',
        width: '100%',
        minHeight: 44,
        transition: 'background 0.15s, border-color 0.15s'
      }}
    >
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: isFatigue ? '#fb923c' : '#e7e5e4',
        lineHeight: 1.3,
        wordBreak: 'break-word',
        width: '100%'
      }}>
        {item.name}
      </span>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {isFatigue && (
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
            color: '#ea580c', textTransform: 'uppercase'
          }}>Fatigue</span>
        )}
        {isBulky && (
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
            color: '#a8a29e', textTransform: 'uppercase'
          }}>Bulky</span>
        )}
        {isPetty && (
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
            color: '#6b7280', textTransform: 'uppercase'
          }}>Petty</span>
        )}
      </div>
    </button>
  )
}
