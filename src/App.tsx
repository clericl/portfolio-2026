import { Scene } from './components/scene'

import './App.css'
import { useScroll } from './hooks'
import { Modal } from './components/modal'
import { ModalProvider } from './components/modal/modal'

function App() {
  useScroll()
  
  return (
    <ModalProvider>
      <Modal />
      <Scene />
    </ModalProvider>
  )
}

export default App
