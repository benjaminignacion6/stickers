import { useState } from 'react'
import './App.css'
import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'

function App() {
  const [statuses, setStatuses] = useState(() =>
    stickers.reduce((acc, sticker) => {
      acc[sticker.id] = 'falta'
      return acc
    }, {})
  )

  const previewStickers = stickers.slice(0, 5)

  const handleStatusChange = (id) => {
    setStatuses((current) => {
      const order = ['falta', 'tengo', 'repetida']
      const currentStatus = current[id] || 'falta'
      const nextIndex = (order.indexOf(currentStatus) + 1) % order.length

      return {
        ...current,
        [id]: order[nextIndex]
      }
    })
  }

  return (
    <main style={{ padding: '1rem' }}>
      <section>
        <h1>Álbum Mundial 2026</h1>
        <p>Figuritas cargadas: {stickers.length}</p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginTop: '1rem'
        }}
      >
        {previewStickers.map((sticker) => (
          <StickerCard
            key={sticker.id}
            number={sticker.id}
            name={sticker.name}
            group={sticker.group || sticker.section}
            status={statuses[sticker.id] || 'falta'}
            onClick={() => handleStatusChange(sticker.id)}
          />
        ))}
      </section>
    </main>
  )
}

export default App
