import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Logo } from '../../components/Icons'
import { hotel } from '../../data/hotel'
import { employee } from '../data/panelData'
import { PanelIcon } from '../components/PanelIcons'

export default function Login({ onSignIn }) {
  const [username, setUsername] = useState(employee.username)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = e => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Enter your username.')
      document.getElementById('login-username')?.focus()
      return
    }
    setError('')
    onSignIn(username)
    navigate('/panel')
  }

  return (
    <div className="grid min-h-dvh bg-navy lg:grid-cols-2">
      <div className="on-dark flex flex-col justify-between p-8 lg:p-12">
        <Link to="/" className="flex items-center gap-2.5 text-white">
          <Logo className="size-9" />
          <span className="font-display text-2xl font-semibold tracking-tight">{hotel.shortName}</span>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide">PMS</span>
        </Link>

        <div className="hidden py-12 lg:block">
          <h1 className="max-w-md font-display text-5xl font-medium leading-tight tracking-tight text-white">
            Staff sign in
          </h1>
          <p className="mt-4 max-w-sm text-lg text-white/80">
            Front desk, housekeeping and management tools for {hotel.name}.
          </p>
          <ul className="mt-8 space-y-3 text-white/80">
            {['Arrivals and departures at a glance', 'Live room and housekeeping status', 'Occupancy and revenue reporting'].map(item => (
              <li key={item} className="flex items-center gap-3">
                <PanelIcon name="check" className="size-5 text-amber" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/60">© {new Date().getFullYear()} {hotel.name}</p>
      </div>

      <div className="flex items-center justify-center bg-cream p-6 sm:p-10">
        <div className="w-full max-w-sm rounded-card bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-medium tracking-tight">Log in to the panel</h2>
          <p className="mt-2 text-sm text-muted">Demo sign-in: any username works, no password needed.</p>

          <form noValidate onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-username" className="field-label">
                Username
              </label>
              <input
                id="login-username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'login-error' : undefined}
                className="field-input"
              />
              {error && (
                <p id="login-error" className="field-error">
                  <PanelIcon name="alert" className="mt-px size-4 shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="field-label">
                Password <span className="font-normal text-muted">(not checked in demo)</span>
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="field-input"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Log in
            </button>
          </form>

          <Link to="/" className="link mt-6 inline-block text-sm">
            Back to hotel website
          </Link>
        </div>
      </div>
    </div>
  )
}
