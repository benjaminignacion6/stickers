import './App.css'
import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'

function App() {
  console.log('Figuritas:', stickers)

  const previewStickers = stickers.slice(0, 5)
  const statusByIndex = ['tengo', 'repetida', 'falta', 'tengo', 'repetida']

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
        {previewStickers.map((sticker, index) => (
          <StickerCard
            key={sticker.id}
            number={sticker.id}
            name={sticker.name}
            group={sticker.group || sticker.section}
            status={statusByIndex[index]}
          />
        ))}
      </section>
    </main>
  )
}

export default App
