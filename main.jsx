import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [platform, setPlatform] = useState('Etsy')
  const [style, setStyle] = useState('Country / Primitive')
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)

  function generateListing() {
    const tone =
      style === 'Country / Primitive'
        ? 'This piece has that good old country charm and vintage character folks love.'
        : style === 'Professional'
        ? 'This item is a charming vintage piece with decorative appeal and age-appropriate wear.'
        : style === 'Fun & Quirky'
        ? 'This is such a fun vintage find with lots of personality.'
        : 'This is a sweet vintage piece with a warm, easy-to-love look.'

    setResult({
      title: 'Vintage Hand Painted Wooden Bucket | Folk Art Farmhouse Decor',
      price: '$38 - $58',
      tags: [
        'primitive decor',
        'folk art bucket',
        'painted wooden bucket',
        'farmhouse decor',
        'vintage decor',
        'rustic kitchen',
        'country cottage',
        'hand painted',
        'vintage wooden pail',
        'Americana decor',
        'cabin decor',
        'primitive kitchen',
        'tole painted'
      ],
      description: `${tone} It would look great in a farmhouse kitchen, primitive home, cabin, or shelf display. Shows normal vintage wear from age including scratches, marks, and finish wear. ${notes ? 'Seller notes: ' + notes : ''}`
    })
  }

  async function copyText(text) {
    await navigator.clipboard.writeText(text)
    alert('Copied!')
  }

  return (
    <main className="page">
      <section className="card">
        <header className="header">
          <h1>PrimList</h1>
          <p>Easy AI-style listings for vintage and handmade sellers</p>
        </header>

        <div className="content">
          <div className="uploadBox">
            <div className="camera">📷</div>
            <h2>Take a Picture</h2>
            <p>Upload your item and create a listing draft.</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            {image && <p className="small">Photo selected: {image.name}</p>}
          </div>

          <label>Item notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Example: small chip on bottom, wood handle, handmade, good vintage wear..."
          />

          <label>Where are you listing?</label>
          <div className="grid">
            {['Etsy', 'eBay', 'Facebook', 'Mercari', 'Poshmark'].map((p) => (
              <button
                key={p}
                className={platform === p ? 'selected' : ''}
                onClick={() => setPlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <label>Pick your writing style</label>
          <div className="styles">
            {['Country / Primitive', 'Simple & Friendly', 'Professional', 'Vintage Boutique', 'Fun & Quirky'].map((s) => (
              <button
                key={s}
                className={style === s ? 'selected' : ''}
                onClick={() => setStyle(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="generate" onClick={generateListing}>
            Generate My Listing
          </button>

          {result && (
            <div className="results">
              <Result label="Title" text={result.title} copy={copyText} />
              <Result label="Suggested Price" text={result.price} copy={copyText} />
              <Result label="Tags" text={result.tags.join(', ')} copy={copyText} />
              <Result label="Description" text={result.description} copy={copyText} />
              <p className="small">
                Platform selected: {platform}. This is the starter version. Real AI photo reading gets connected later.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function Result({ label, text, copy }) {
  return (
    <div className="resultItem">
      <div className="row">
        <h3>{label}</h3>
        <button onClick={() => copy(text)}>Copy</button>
      </div>
      <p>{text}</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
