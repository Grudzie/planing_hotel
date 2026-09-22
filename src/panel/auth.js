import { useCallback, useEffect, useState } from 'react'
import { employee } from './data/panelData'

// Demo sign-in only: no password check, no server, no security.
const STORAGE_KEY = 'amberbay.panel.session'

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useSession() {
  const [user, setUser] = useState(readSession)

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Private mode or blocked storage: session stays in memory only.
    }
  }, [user])

  const signIn = useCallback(username => {
    const name = username.trim() || employee.username
    setUser({ ...employee, username: name })
  }, [])

  const signOut = useCallback(() => setUser(null), [])

  return { user, signIn, signOut }
}
