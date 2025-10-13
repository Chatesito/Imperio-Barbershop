import { useState } from 'react'
import Navbar from './components/navBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />
      </div>
    </>
  )
}

export default App
