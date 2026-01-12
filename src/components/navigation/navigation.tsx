import { useCallback } from "react"

export function Navigation() {
  const goTo = useCallback((pathname: string) => {
    history.pushState({}, '', pathname)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])

  return (
    <nav className="absolute top-8 right-12 z-20 font-(family-name:--typeface-secondary) text-white text-[2rem] flex gap-8">
      <span className="cursor-pointer hover:underline" onClick={() => goTo('/')}>Home</span>
      <span className="cursor-pointer hover:underline" onClick={() => goTo('/about')}>About</span>
      <span className="cursor-pointer hover:underline" onClick={() => goTo('/projects')}>Projects</span>
    </nav>
  )
}
