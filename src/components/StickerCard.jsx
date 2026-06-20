function StickerCard({ number, name, group, status, onClick }) {
  const normalizedStatus = status?.toLowerCase()

  const statusStyles = {
    tengo: {
      background: '#dff7df',
      border: '#2f9e44',
      text: '#1b5e20'
    },
    repetida: {
      background: '#fff5b0',
      border: '#d4a600',
      text: '#7a5a00'
    },
    falta: {
      background: '#ececec',
      border: '#9a9a9a',
      text: '#4a4a4a'
    }
  }

  const style = statusStyles[normalizedStatus] || statusStyles.falta

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        borderRadius: '10px',
        padding: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        textAlign: 'left',
        cursor: 'pointer'
      }}
    >
      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: style.text }}>
        #{number}
      </span>
      <h3 style={{ margin: 0, fontSize: '1rem' }}>{name}</h3>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>{group}</p>
      <span
        style={{
          alignSelf: 'flex-start',
          padding: '0.2rem 0.5rem',
          borderRadius: '999px',
          background: '#fff',
          color: style.text,
          fontSize: '0.8rem',
          fontWeight: '600'
        }}
      >
        {normalizedStatus}
      </span>
    </button>
  )
}

export default StickerCard
