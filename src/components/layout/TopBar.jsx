import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, backTo, actions }) {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      background: '#1c1917',
      borderBottom: '1px solid #292524',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      gap: 12,
      zIndex: 40,
      minHeight: 56
    }}>
      {backTo !== undefined && (
        <button
          onClick={() => backTo ? navigate(backTo) : navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: '#d97706',
            cursor: 'pointer',
            padding: '8px 8px 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 15,
            fontWeight: 500,
            minWidth: 44,
            minHeight: 44
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
      )}
      <h1 style={{
        flex: 1,
        margin: 0,
        fontSize: 18,
        fontWeight: 700,
        color: '#e7e5e4',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {title}
      </h1>
      {actions && (
        <div style={{ display: 'flex', gap: 8 }}>
          {actions}
        </div>
      )}
    </div>
  )
}
