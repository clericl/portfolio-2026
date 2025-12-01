import { Scene } from './components/scene'

import './App.css'
import { useScroll } from './hooks'

function App() {
  useScroll()
  
  return (
    <Scene />
  )
}

export default App
