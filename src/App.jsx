import { useEffect, useState } from 'react'
import './App.css'
import { stickers } from './data/stickers'
import AlbumSummary from './components/AlbumSummary'
import StickerCard from './components/StickerCard'

function App() {
  const getDefaultStatuses = () =>
    stickers.reduce((acc, sticker) => {
      acc[sticker.id] = 'falta'
      return acc
    }, {})

  const getStoredStatuses = () => {
    if (typeof window === 'undefined') return null

    try {
      const savedStatuses = localStorage.getItem('album-statuses')
      if (!savedStatuses) return null

      const parsedStatuses = JSON.parse(savedStatuses)
      return parsedStatuses && typeof parsedStatuses === 'object'
        ? { ...getDefaultStatuses(), ...parsedStatuses }
        : null
    } catch {
      return null
    }
  }

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todas')
  const [statuses, setStatuses] = useState(() => {
    const storedStatuses = getStoredStatuses()
    return storedStatuses || getDefaultStatuses()
  })

  useEffect(() => {
    localStorage.setItem('album-statuses', JSON.stringify(statuses))
  }, [statuses])

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

  const total = stickers.length
  const tengo = stickers.filter((sticker) => (statuses[sticker.id] || 'falta') === 'tengo').length
  const repetida = stickers.filter((sticker) => (statuses[sticker.id] || 'falta') === 'repetida').length
  const falta = stickers.filter((sticker) => (statuses[sticker.id] || 'falta') === 'falta').length

  return (
    <main style={{ padding: '1rem' }}>
      <section>
        <h1>Álbum Mundial 2026</h1>
        <p>Figuritas cargadas: {total}</p>
        <p>Figuritas visibles: {visibleStickers.length}</p>
      </section>

      <AlbumSummary total={total} tengo={tengo} repetida={repetida} falta={falta} />

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
