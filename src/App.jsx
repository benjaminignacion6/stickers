import { useState } from 'react'
import './App.css'
import { stickers } from './data/stickers'

function App() {
  const [count, setCount] = useState(0)
  console.log('Figuritas:', stickers)

  return (
    <main style={{ padding: '1rem' }}>
      <section>
        <h1>Álbum Mundial 2026</h1>
        <p>Figuritas cargadas: {stickers.length}</p>
        <button onClick={() => setCount((value) => value + 1)}>
          Count is {count}
        </button>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '1rem' }}>
        {stickers.map((sticker) => (
          <article key={sticker.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0.75rem' }}>
            <strong>{sticker.code}</strong>
            <p>{sticker.name}</p>
            <small>{sticker.section}</small>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
