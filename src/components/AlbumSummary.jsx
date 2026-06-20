function AlbumSummary({ total, tengo, repetida, falta }) {
  const completion = total > 0 ? Math.round((tengo / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total },
    { label: 'Tengo', value: tengo },
    { label: 'Repetidas', value: repetida },
    { label: 'Faltan', value: falta }
  ]

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}
    >
      {stats.map((item) => (
        <div
          key={item.label}
          style={{
            background: '#f7f7f7',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '0.75rem'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{item.label}</p>
          <strong style={{ fontSize: '1.4rem' }}>{item.value}</strong>
        </div>
      ))}

      <div
        style={{
          background: '#eef7ff',
          border: '1px solid #b7d8ff',
          borderRadius: '10px',
          padding: '0.75rem'
        }}
      >
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>Completitud</p>
        <strong style={{ fontSize: '1.4rem' }}>{completion}%</strong>
      </div>
    </section>
  )
}

export default AlbumSummary
