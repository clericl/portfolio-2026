import { useCallback, useEffect, useState } from "react";

export function useLocation() {
  const [, setRefresh] = useState(true)

  const update = useCallback(() => {
    setRefresh((prev) => !prev)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [update]);

  return window.location
}
