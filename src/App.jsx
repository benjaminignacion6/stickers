import { useState } from 'react'
import './App.css'
import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'

function App() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todas')
  const [statuses, setStatuses] = useState(() =>
    stickers.reduce((acc, sticker) => {
      acc[sticker.id] = 'falta'
      return acc
    }, {})
  )

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

  const normalizedSearch = search.trim().toLowerCase()

  const visibleStickers = stickers.filter((sticker) => {
    const matchesSearch =
      normalizedSearch === '' ||
      sticker.name.toLowerCase().includes(normalizedSearch) ||
      String(sticker.id).includes(normalizedSearch)

    const currentStatus = statuses[sticker.id] || 'falta'
    const matchesFilter =
      filter === 'todas' ||
      (filter === 'tengo' && currentStatus === 'tengo') ||
      (filter === 'repetidas' && currentStatus === 'repetida') ||
      (filter === 'faltan' && currentStatus === 'falta')

    return matchesSearch && matchesFilter
  })

  return (
    <main style={{ padding: '1rem' }}>
      <section>
        <h1>Álbum Mundial 2026</h1>
        <p>Figuritas cargadas: {stickers.length}</p>
        <p>Figuritas visibles: {visibleStickers.length}</p>
      </section>

      <section
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          margin: '1rem 0'
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre o número"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            minWidth: '240px'
          }}
        />

        <button onClick={() => setFilter('todas')} type="button">Todas</button>
        <button onClick={() => setFilter('tengo')} type="button">Tengo</button>
        <button onClick={() => setFilter('repetidas')} type="button">Repetidas</button>
        <button onClick={() => setFilter('faltan')} type="button">Faltan</button>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}
      >
        {visibleStickers.map((sticker) => (
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
