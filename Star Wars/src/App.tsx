import { useState } from 'react'
import './App.css'
import Cards from './components/Cards';

function App() {
  const [] = useState(0)

  return (
    <main className='flex h-screen'>

<div>
      <Cards />
    </div>
    </main>
  )
}

export default App
