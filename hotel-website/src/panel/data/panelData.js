// Sample PMS data. Replace with API calls when a backend exists.

export const employee = {
  name: 'Julia Lewandowska',
  role: 'Front Desk Manager',
  username: 'j.lewandowska',
  initials: 'JL',
  shift: 'Day shift · 07:00–15:00',
}

export const navItems = [
  { to: '/panel', end: true, icon: 'dashboard', label: 'Dashboard' },
  { to: '/panel/reservations', icon: 'bookmark', label: 'Reservations', badge: 12 },
  { to: '/panel/calendar', icon: 'calendar', label: 'Calendar' },
  { to: '/panel/rooms', icon: 'bed', label: 'Rooms' },
  { to: '/panel/guests', icon: 'users', label: 'Guests' },
  { to: '/panel/front-desk', icon: 'key', label: 'Check-in / Check-out', badge: 5 },
  { to: '/panel/reports', icon: 'chart', label: 'Statistics / Reports' },
  { to: '/panel/settings', icon: 'settings', label: 'Settings' },
]

export const kpis = [
  { id: 'arrivals', label: 'Arrivals today', value: 18, sub: '5 not checked in yet', icon: 'arrowDown', trend: +3, tone: 'navy' },
  { id: 'departures', label: 'Departures today', value: 11, sub: '2 late check-outs', icon: 'arrowUp', trend: -1, tone: 'navy' },
  { id: 'inhouse', label: 'Guests in house', value: 64, sub: '31 of 48 rooms', icon: 'users', trend: +6, tone: 'rating' },
  { id: 'revenue', label: 'Revenue today', value: 7420, currency: true, sub: 'ADR €164 · RevPAR €142', icon: 'euro', trend: +8, tone: 'amber' },
]

export const occupancy = {
  today: 86,
  rooms: { total: 48, occupied: 31, arrivalsDue: 8, cleaning: 5, outOfOrder: 1, free: 3 },
  // 7-day forecast, oldest first
  week: [
    { day: 'Mon', value: 72 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 86 },
    { day: 'Thu', value: 91 },
    { day: 'Fri', value: 97 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 83 },
  ],
}

export const revenueTrend = [4820, 5210, 4990, 6140, 6880, 7420, 7010, 6520, 7180, 7940, 8310, 7420]

// Order matters: adjacent segments were validated in this order
export const roomStatus = [
  { id: 'occupied', label: 'Occupied', count: 31 },
  { id: 'free', label: 'Ready to sell', count: 3 },
  { id: 'cleaning', label: 'Cleaning', count: 5 },
  { id: 'arrivals', label: 'Arrivals due', count: 8 },
  { id: 'ooo', label: 'Out of order', count: 1 },
]

export const arrivals = [
  { id: 'AB-4F7K2Q', guest: 'Marta Kowalska', room: '204', type: 'Superior Sea View', nights: 2, guests: 2, eta: '14:30', status: 'confirmed', note: 'Late arrival possible' },
  { id: 'AB-9XK1LM', guest: 'James Robertson', room: '311', type: 'Deluxe King', nights: 3, guests: 1, eta: '15:00', status: 'checked-in', note: '' },
  { id: 'AB-2PQ8ZT', guest: 'Familie Meyer', room: '108', type: 'Family Room', nights: 4, guests: 4, eta: '16:15', status: 'confirmed', note: 'Baby cot requested' },
  { id: 'AB-7RT3WD', guest: 'Lena Brandt', room: '402', type: 'Panorama Suite', nights: 2, guests: 2, eta: '17:00', status: 'guaranteed', note: 'VIP · welcome amenity' },
  { id: 'AB-5MN6YH', guest: 'Piotr Nowak', room: '117', type: 'Classic Double', nights: 1, guests: 2, eta: '18:45', status: 'confirmed', note: '' },
]

export const departures = [
  { id: 'AB-1QW2ER', guest: 'Sofia Rossi', room: '206', balance: 0, out: '11:00', status: 'checked-out' },
  { id: 'AB-3TY4UI', guest: 'Tom Hansen', room: '305', balance: 148, out: '11:00', status: 'pending' },
  { id: 'AB-8OP9AS', guest: 'Clara Dubois', room: '112', balance: 0, out: '12:30', status: 'late-checkout' },
]

export const tasks = [
  { id: 1, text: 'Approve 3 housekeeping overtime hours', due: 'Today', priority: 'high', done: false },
  { id: 2, text: 'Confirm group booking Gdańsk Conference (14 rooms)', due: 'Today', priority: 'high', done: false },
  { id: 3, text: 'Reply to 2 guest messages', due: 'Today', priority: 'normal', done: false },
  { id: 4, text: 'Order beach towels for weekend', due: 'Tomorrow', priority: 'low', done: true },
]

export const notifications = [
  { id: 1, title: 'New reservation', text: 'Panorama Suite · 24–27 Sept · €1,047', time: '4 min ago', unread: true },
  { id: 2, title: 'Room 305 balance open', text: '€148 unpaid, departure 11:00', time: '22 min ago', unread: true },
  { id: 3, title: 'Maintenance', text: 'Room 219 heating reported faulty', time: '1 h ago', unread: true },
  { id: 4, title: 'Housekeeping', text: 'Floor 2 cleaning finished', time: '2 h ago', unread: false },
]

export const searchIndex = [
  { type: 'Reservation', label: 'AB-4F7K2Q · Marta Kowalska', meta: 'Room 204 · arrives today' },
  { type: 'Reservation', label: 'AB-7RT3WD · Lena Brandt', meta: 'Room 402 · VIP' },
  { type: 'Guest', label: 'James Robertson', meta: '3 past stays · Manchester' },
  { type: 'Guest', label: 'Piotr Nowak', meta: 'First stay · Warsaw' },
  { type: 'Room', label: 'Room 219', meta: 'Out of order · heating' },
  { type: 'Room', label: 'Room 402 · Panorama Suite', meta: 'Occupied until 26 Sept' },
]

export const channelMix = [
  { label: 'Direct', share: 42 },
  { label: 'Booking.com', share: 31 },
  { label: 'Expedia', share: 14 },
  { label: 'Corporate', share: 13 },
]
