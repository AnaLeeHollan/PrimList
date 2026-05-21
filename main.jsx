import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [image, setImage] = useState(null)

  return (
    <main className="page">
      <section className="card">
        <h1>PrimList</h1>

        <div className="uploadBox">
          <h2>Take a Picture</h2>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return

              const imageUrl = URL.createObjectURL(file)
              setImage(imageUrl)
            }}
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              className="previewImage"
            />
          )}
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
