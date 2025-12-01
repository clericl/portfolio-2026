import { useCallback, useEffect, useRef, type RefCallback } from "react"
import { useSwipeable } from "react-swipeable"
import { PLATFORMS } from "../../components/staircase"

const TIMEOUT = 250

export function useScroll() {
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
    if (Math.abs(e.deltaY) >= 50) {
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
  }, [handleNext, handlePrev])

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
