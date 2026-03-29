import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""))
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }

    // 👉 default: scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname, hash])

  return null
}
