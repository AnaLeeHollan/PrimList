import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [image, setImage] = useState('')
  const [platform, setPlatform] = useState('Etsy')
  const [style, setStyle] = useState('Country / Primitive')
  const [notes, setNotes] = useState('')
  const [result, setResult] = useState(null)

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(URL.createObjectURL(file))
    e.target.value = ''
  }

  function generateListing() {
    setResult({
      title: 'Vintage Hand Painted Wooden Bucket | Folk Art Farmhouse Decor',
      price: '$38 - $58',
      tags: 'primitive decor, folk art bucket, farmhouse decor, vintage wooden bucket, country kitchen, rustic decor, hand painted, cabin decor',
      description: `A charming vintage-style piece with warm country character. Great for primitive, farmhouse, cabin, or rustic home decor. ${notes}`
    })
  }

  function copy(text) {
    navigator.clipboard.writeText(text)
    alert('Copied!')
  }

  return (
    <main className="page">
      <section className="card">
        <header className="header">
          <h1>PrimList</h1>
          <p>Easy listings for vintage and handmade sellers</p>
        </header>

        <div className="content">
          <div className="uploadBox">
            <h2>Take or Upload Picture</h2>

            <label className="photoButton">
              Take New Photo
              <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} hidden />
            </label>

            <label className="photoButton">
              Choose From Phone
              <input type="file" accept="image/*" onChange={handlePhoto} hidden />
            </label>

            
{image && (
  <img
    src={image}
    className="previewImage"
  />
)}
            
    

          <label>Item notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add condition, size, age, flaws..." />

          <label>Where are you listing?</label>
          <div className="grid">
            {['Etsy', 'eBay', 'Facebook', 'Mercari', 'Poshmark'].map(p => (
              <button className={platform === p ? 'selected' : ''} onClick={() => setPlatform(p)}>{p}</button>
            ))}
          </div>

          <label>Writing style</label>
          <div className="styles">
            {['Country / Primitive', 'Simple & Friendly', 'Professional', 'Vintage Boutique', 'Fun & Quirky'].map(s => (
              <button className={style === s ? 'selected' : ''} onClick={() => setStyle(s)}>{s}</button>
            ))}
          </div>

         <button className="generate" onClick={generateListing}>
  Generate My Listing
</button>

          {result && (
            <div className="results">
              <Result label="Title" text={result.title} copy={copy} />
              <Result label="Suggested Price" text={result.price} copy={copy} />
              <Result label="Tags" text={result.tags} copy={copy} />
              <Result label="Description" text={result.description} copy={copy} />
              <p className="small">Platform: {platform} | Style: {style}</p>
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
