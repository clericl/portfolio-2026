import { Scene } from './components/scene'

import './App.css'
import { useScroll } from './hooks'
import { Modal } from './components/modal'
import { ModalProvider } from './components/modal/modal'
import { Navigation } from './components/navigation'
import { useEffect, useState } from 'react'
import { Mobile } from './components/mobile'

function App() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;
  // const isMobile = true

  useScroll()
  
  return isMobile ? (
    <Mobile />
  ) : (
    <ModalProvider>
      <Modal />
      <Scene />
      <Navigation />
    </ModalProvider>
  )
}

export default App
