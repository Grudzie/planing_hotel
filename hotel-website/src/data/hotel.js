// Placeholder content: replace with your real hotel details, photos and reviews.

const photo = (id, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`

export const TAX_RATE = 0.08

export const hotel = {
  name: 'Amber Bay Hotel',
  shortName: 'Amber Bay',
  address: 'ul. Morska 12, 81-701 Sopot, Poland',
  phone: '+48 58 000 00 00',
  phoneHref: 'tel:+48580000000',
  email: 'stay@amberbay.example',
  rating: 9.2,
  reviewCount: 1284,
  checkInTime: '15:00',
  checkOutTime: '11:00',
  mapQuery: 'Sopot Pier, Sopot, Poland',
}

export const images = {
  hero: photo('1566073771259-6a8506099945', 2000),
  building: photo('1455587734955-081b22074882', 1000),
  restaurant: photo('1414235077428-338989a2e8c0', 700),
}

export function ratingLabel(score) {
  if (score >= 9.4) return 'Exceptional'
  if (score >= 9) return 'Wonderful'
  if (score >= 8.6) return 'Excellent'
  if (score >= 8) return 'Very good'
  return 'Good'
}

export const highlights = [
  {
    icon: 'tag',
    title: 'Best price, booked direct',
    text: 'Lower rates than on booking sites, guaranteed.',
    href: '#reservation',
    linkLabel: 'Book now',
  },
  {
    icon: 'calendarCheck',
    title: 'Plans change? No problem.',
    text: 'Free cancellation up to 48 hours before arrival.',
    href: '#rooms',
    linkLabel: 'View rooms',
  },
  {
    icon: 'coffee',
    title: 'Breakfast is on us',
    text: 'Every direct booking includes our breakfast buffet.',
    href: '#amenities',
    linkLabel: 'See amenities',
  },
]

export const stats = [
  { value: '9.2', label: 'Guest rating' },
  { value: '48', label: 'Rooms & suites' },
  { value: '200 m', label: 'To the beach' },
  { value: '24/7', label: 'Reception' },
]

export const roomCategories = [
  { id: 'all', label: 'All rooms' },
  { id: 'standard', label: 'Standard' },
  { id: 'deluxe', label: 'Deluxe' },
  { id: 'family', label: 'Family' },
  { id: 'suite', label: 'Suites' },
]

export const rooms = [
  {
    id: 'classic-double',
    name: 'Classic Double Room',
    category: 'standard',
    size: 22,
    maxGuests: 2,
    bed: '1 queen bed',
    view: 'Garden view',
    price: 119,
    oldPrice: null,
    rating: 8.8,
    reviews: 312,
    badge: null,
    image: photo('1611892440504-42a792e24d32', 900),
    description:
      'A bright, quiet room with a comfortable queen bed, a rain shower and a work desk. Ideal for a short city-and-beach break.',
    features: ['Rain shower', 'Work desk', 'Smart TV', 'Coffee & tea station', 'Air conditioning', 'Free Wi-Fi'],
  },
  {
    id: 'superior-sea-view',
    name: 'Superior Sea View',
    category: 'deluxe',
    size: 28,
    maxGuests: 2,
    bed: '1 king bed',
    view: 'Sea view',
    price: 159,
    oldPrice: 189,
    rating: 9.3,
    reviews: 486,
    badge: 'Most popular',
    image: photo('1590490360182-c33d57733427', 900),
    description:
      'Wake up to the Baltic horizon. Floor-to-ceiling windows, a king bed and a cosy reading corner facing the sea.',
    features: ['Sea view', 'King bed', 'Espresso machine', 'Bathrobes & slippers', 'Minibar', 'Free Wi-Fi'],
  },
  {
    id: 'deluxe-balcony',
    name: 'Deluxe King with Balcony',
    category: 'deluxe',
    size: 32,
    maxGuests: 3,
    bed: '1 king bed + sofa bed',
    view: 'Partial sea view',
    price: 179,
    oldPrice: null,
    rating: 9.1,
    reviews: 204,
    badge: 'Balcony',
    image: photo('1618773928121-c32242e63f39', 900),
    description:
      'Extra space and a private balcony for morning coffee in the sea breeze. The sofa bed makes room for a third guest.',
    features: ['Private balcony', 'Sofa bed', 'Espresso machine', 'Walk-in shower', 'Minibar', 'Free Wi-Fi'],
  },
  {
    id: 'family-room',
    name: 'Family Room',
    category: 'family',
    size: 40,
    maxGuests: 4,
    bed: '1 king + 2 single beds',
    view: 'Garden view',
    price: 209,
    oldPrice: 239,
    rating: 9.0,
    reviews: 158,
    badge: 'Kids stay free',
    image: photo('1596394516093-501ba68a0ba6', 900),
    description:
      'A spacious room for the whole family, with a separate sleeping nook for kids, a bathtub and games for rainy days.',
    features: ['Separate kids area', 'Bathtub', 'Baby cot on request', 'Board games', 'Smart TV', 'Free Wi-Fi'],
  },
  {
    id: 'junior-suite',
    name: 'Junior Suite',
    category: 'suite',
    size: 45,
    maxGuests: 3,
    bed: '1 king bed + sofa bed',
    view: 'Sea view',
    price: 249,
    oldPrice: null,
    rating: 9.5,
    reviews: 97,
    badge: null,
    image: photo('1582719478250-c89cae4dc85b', 900),
    description:
      'An open-plan suite with a lounge area, freestanding bathtub and sea views. Includes spa access and evening turndown.',
    features: ['Lounge area', 'Freestanding bathtub', 'Spa access', 'Evening turndown', 'Minibar', 'Free Wi-Fi'],
  },
  {
    id: 'panorama-suite',
    name: 'Panorama Suite',
    category: 'suite',
    size: 68,
    maxGuests: 4,
    bed: '1 king bed + 2 sofa beds',
    view: 'Panoramic sea view',
    price: 349,
    oldPrice: 399,
    rating: 9.7,
    reviews: 64,
    badge: 'Private terrace',
    image: photo('1578683010236-d716f9a3f461', 900),
    description:
      'Our top-floor suite with a private terrace, separate living room and a 180° view over the bay. Breakfast served in-suite.',
    features: ['Private terrace', 'Separate living room', 'In-suite breakfast', 'Spa access', 'Premium minibar', 'Free Wi-Fi'],
  },
]

export const packages = [
  {
    id: 'romantic',
    title: 'Romantic escape',
    text: 'Champagne on arrival, dinner for two and late check-out.',
    nights: 2,
    save: 20,
    roomId: 'superior-sea-view',
    image: photo('1631049307264-da0ec9d70304', 800),
  },
  {
    id: 'spa',
    title: 'Spa weekend',
    text: 'A 60-minute massage each and full spa access.',
    nights: 2,
    save: 18,
    roomId: 'deluxe-balcony',
    image: photo('1544161515-4ab6ce6db874', 800),
  },
  {
    id: 'family',
    title: 'Family by the sea',
    text: 'Kids under 12 stay and eat free. Beach kit included.',
    nights: 3,
    save: 15,
    roomId: 'family-room',
    image: photo('1507525428034-b723cf961d3e', 800),
  },
]

export const amenities = [
  { icon: 'wifi', title: 'Free high-speed Wi-Fi', text: 'Fast fibre connection in every room and public area.' },
  { icon: 'waves', title: 'Heated indoor pool', text: 'Open daily 7:00–22:00, with loungers and towels.' },
  { icon: 'leaf', title: 'Spa & sauna', text: 'Massages, Finnish sauna and a quiet relaxation room.' },
  { icon: 'utensils', title: 'Seafood restaurant', text: 'Fresh Baltic fish and seasonal Polish dishes.' },
  { icon: 'coffee', title: 'Breakfast included', text: 'Buffet with local bakery bread, served 7:00–11:00.' },
  { icon: 'parking', title: 'Private parking', text: 'Secure underground garage with EV charging.' },
  { icon: 'dumbbell', title: '24/7 fitness room', text: 'Cardio machines and free weights, always open.' },
  { icon: 'umbrella', title: '200 m to the beach', text: 'Beach towels and loungers ready at reception.' },
]

export const reviewScores = [
  { label: 'Cleanliness', score: 9.5 },
  { label: 'Staff & service', score: 9.6 },
  { label: 'Location', score: 9.7 },
  { label: 'Comfort', score: 9.1 },
  { label: 'Value for money', score: 8.8 },
]

export const reviews = [
  {
    name: 'Marta K.',
    from: 'Warsaw, Poland',
    stay: 'Couple · August 2026',
    score: 10,
    title: 'Our favourite seaside hotel',
    text: 'The sea-view room was spotless and so quiet. Breakfast was the best we have had in Poland, and the staff remembered our names from day one.',
  },
  {
    name: 'James R.',
    from: 'Manchester, UK',
    stay: 'Business trip · July 2026',
    score: 9.2,
    title: 'Perfect base for Gdańsk and Sopot',
    text: 'Easy train connection, fast Wi-Fi and a proper desk in the room. After meetings, the pool and sauna were exactly what I needed.',
  },
  {
    name: 'Lena & Tom',
    from: 'Hamburg, Germany',
    stay: 'Family · June 2026',
    score: 9.6,
    title: 'The kids did not want to leave',
    text: 'The family room had plenty of space, the beach is a two-minute walk, and the team even had buckets and spades ready for our boys.',
  },
]

export const directions = [
  { place: 'Sopot Pier', time: '5 min walk' },
  { place: 'Sopot railway station', time: '10 min walk' },
  { place: 'Gdańsk Old Town', time: '25 min by train' },
  { place: 'Gdańsk Airport', time: '25 min by car' },
]
