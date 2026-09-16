import { Navigate, Route, Routes } from 'react-router'
import App from './App'
import { useSession } from './panel/auth'
import PanelLayout from './panel/PanelLayout'
import Dashboard from './panel/pages/Dashboard'
import Login from './panel/pages/Login'
import Placeholder from './panel/pages/Placeholder'

const placeholders = [
  {
    path: 'reservations',
    icon: 'bookmark',
    title: 'Reservations',
    description: 'Search, create and edit bookings from every channel in one list.',
    planned: ['Filter by date, status and channel', 'Create and modify reservations', 'Payment and deposit tracking'],
  },
  {
    path: 'calendar',
    icon: 'calendar',
    title: 'Calendar',
    description: 'A room-by-day timeline to see stays and move bookings.',
    planned: ['Drag and drop room moves', 'Week and month views', 'Blocked dates and maintenance'],
  },
  {
    path: 'rooms',
    icon: 'bed',
    title: 'Rooms',
    description: 'Room status, housekeeping and maintenance in one place.',
    planned: ['Clean / dirty / inspected status', 'Out-of-order management', 'Rates per room type'],
  },
  {
    path: 'guests',
    icon: 'users',
    title: 'Guests',
    description: 'Guest profiles with stay history and preferences.',
    planned: ['Stay history and spend', 'Preferences and notes', 'GDPR export and deletion'],
  },
  {
    path: 'front-desk',
    icon: 'key',
    title: 'Check-in / Check-out',
    description: 'Fast arrival and departure flow for the front desk.',
    planned: ['ID scan and registration card', 'Key card assignment', 'Invoice and payment at check-out'],
  },
  {
    path: 'reports',
    icon: 'chart',
    title: 'Statistics / Reports',
    description: 'Occupancy, ADR, RevPAR and channel performance over time.',
    planned: ['Daily manager report', 'Revenue by channel', 'Export to CSV and PDF'],
  },
  {
    path: 'settings',
    icon: 'settings',
    title: 'Settings',
    description: 'Hotel details, users, roles and integrations.',
    planned: ['Staff accounts and permissions', 'Room types and rates', 'Channel manager connection'],
  },
]

export default function AppRoutes() {
  const { user, signIn, signOut } = useSession()

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/panel/login" element={user ? <Navigate to="/panel" replace /> : <Login onSignIn={signIn} />} />
      <Route path="/panel" element={user ? <PanelLayout user={user} onSignOut={signOut} /> : <Navigate to="/panel/login" replace />}>
        <Route index element={<Dashboard user={user} />} />
        {placeholders.map(({ path, ...page }) => (
          <Route key={path} path={path} element={<Placeholder {...page} />} />
        ))}
        <Route path="*" element={<Navigate to="/panel" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
