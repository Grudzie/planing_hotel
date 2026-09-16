import { useState } from 'react'
import About from './components/About'
import Amenities from './components/Amenities'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Location from './components/Location'
import Offers from './components/Offers'
import Reservation from './components/Reservation'
import Reviews from './components/Reviews'
import RoomModal from './components/RoomModal'
import Rooms from './components/Rooms'
import { addDays, today } from './lib/format'

function createInitialBooking() {
  const checkIn = addDays(today(), 1)
  return { checkIn, checkOut: addDays(checkIn, 2), guests: 2, roomId: 'superior-sea-view', packageId: null }
}

// Scroll to a section and move keyboard focus there too.
function goToSection(id) {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView()
  section.focus({ preventScroll: true })
}

export default function App() {
  // Shared by the hero search, room cards and reservation form
  const [booking, setBooking] = useState(createInitialBooking)
  const [detailsRoom, setDetailsRoom] = useState(null)

  const handleSearch = ({ checkIn, checkOut, guests }) => {
    setBooking(current => ({ ...current, checkIn, checkOut, guests }))
    goToSection('rooms')
  }

  const handleReserve = roomId => {
    setBooking(current => ({ ...current, roomId, packageId: null }))
    setDetailsRoom(null)
    goToSection('reservation')
  }

  const handleChoosePackage = pkg => {
    setBooking(current => ({ ...current, roomId: pkg.roomId, packageId: pkg.id, checkOut: addDays(current.checkIn, pkg.nights) }))
    goToSection('reservation')
  }

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero booking={booking} onSearch={handleSearch} />
        <Highlights />
        <About />
        <Rooms booking={booking} onReserve={handleReserve} onDetails={setDetailsRoom} />
        <Offers onChoose={handleChoosePackage} />
        <Amenities />
        <Reviews />
        <Reservation booking={booking} setBooking={setBooking} />
        <Location />
      </main>
      <Footer />
      <RoomModal room={detailsRoom} booking={booking} onClose={() => setDetailsRoom(null)} onReserve={handleReserve} />
    </>
  )
}
