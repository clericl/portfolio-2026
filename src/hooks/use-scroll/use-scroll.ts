import { useCallback, useContext, useEffect, useRef, type RefCallback } from "react"
import { useSwipeable } from "react-swipeable"
import { ModalContext } from "../../components/modal/utils"
import { PLATFORMS } from "../../utils"

const TIMEOUT = 250

export function useScroll() {
  const { modal } = useContext(ModalContext)

  const timerRef = useRef<number | undefined>(null)

  const handlePrev = useCallback(() => {
    const { pathname } = location

    const pathIndex = PLATFORMS.findIndex(({ title }) => title === pathname)
    if (pathIndex > 0) {
      history.pushState({}, '', PLATFORMS[pathIndex - 1].title)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }, [])

  const handleNext = useCallback(() => {
    const { pathname } = location

    const pathIndex = PLATFORMS.findIndex(({ title }) => title === pathname)
    if (pathIndex < (PLATFORMS.length - 1)) {
      history.pushState({}, '', PLATFORMS[pathIndex + 1].title)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!modal && Math.abs(e.deltaY) >= 50) {
      if (!timerRef.current) {
        if (e.deltaY > 0) {
          handleNext()
        } else if (e.deltaY < 0) {
          handlePrev()
        }
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        timerRef.current = null
      }, TIMEOUT)
    }
  }, [handleNext, handlePrev, modal])

  const { ref } = useSwipeable({
    onSwipedDown: handlePrev,
    onSwipedUp: handleNext,
  }) as { ref: RefCallback<Document> }

  useEffect(() => {
    ref(document)

    document.addEventListener('wheel', handleWheel)
    
    return () => {
      document.removeEventListener('wheel', handleWheel)
      ref(null)
    }
  }, [handleWheel, ref])
}
