// Local fallback catalog — used whenever Supabase isn't configured yet
// (see src/lib/supabaseClient.js) so the storefront always has something
// correct to show. Mirrors the rows inserted by supabase/schema.sql.
// Prices are sample values in USD; edit freely from the Admin Portal
// once Supabase is connected.

export const seedProducts = [
  {
    id: 'seed-bow-silver-ring',
    name: 'Silver Bow Ring',
    category: 'Rings',
    price: 165,
    description:
      'A sterling silver ribbon bow, cast in a soft satin polish and set on a slim tapered band. Delicate enough for everyday, sculptural enough to notice.',
    image_url: '/assets/images/bow-silver-ring.jpg',
    is_featured: true,
  },
  {
    id: 'seed-curved-wave-ring',
    name: 'Curved Wave Ring',
    category: 'Rings',
    price: 140,
    description:
      'An organic, wave-contoured band that catches the light along every curve. Polished sterling silver, comfortable for daily wear.',
    image_url: '/assets/images/curved-wave-ring.jpg',
    is_featured: false,
  },
  {
    id: 'seed-double-layer-wave-ring',
    name: 'Double Layer Wave Ring',
    category: 'Rings',
    price: 175,
    description:
      'Twin parallel waves run side by side around the band, creating an open, architectural silhouette in mirror-polished silver.',
    image_url: '/assets/images/double-layer-wave-ring.jpg',
    is_featured: false,
  },
  {
    id: 'seed-intertwined-twist-ring',
    name: 'Intertwined Twist Ring',
    category: 'Rings',
    price: 155,
    description:
      'A hand-textured, woven silver band inspired by braided cord — a tactile, one-of-a-kind finish on every piece.',
    image_url: '/assets/images/intertwined-twist-ring.jpg',
    is_featured: false,
  },
  {
    id: 'seed-freshwater-pearl-ring',
    name: 'Freshwater Pearl Ring',
    category: 'Rings',
    price: 210,
    description:
      'Five inline freshwater pearls set along a fine textured silver band, finished with a warm mother-of-pearl accent.',
    image_url: '/assets/images/freshwater-pearl-ring.jpg',
    is_featured: true,
  },
  {
    id: 'seed-pink-heart-gem-ring',
    name: 'Pink Heart Gem Ring',
    category: 'Rings',
    price: 240,
    description:
      'Heart-cut pink gemstones alternate with micro-pavé accents around a polished silver eternity band.',
    image_url: '/assets/images/pink-heart-gem-ring.jpg',
    is_featured: true,
  },
  {
    id: 'seed-multiband-beaded-ring',
    name: 'Multi-Band Beaded Ring',
    category: 'Rings',
    price: 190,
    description:
      'Multiple slim beaded bands coil together into a single statement ring — stacked, sculptural, entirely in silver.',
    image_url: '/assets/images/multiband-beaded-ring.jpg',
    is_featured: false,
  },
  {
    id: 'seed-enamel-bow-earrings',
    name: 'Enamel Bow Earrings',
    category: 'Earrings',
    price: 130,
    description:
      'Pearl-finish enamel bows in gold vermeil, centered with a line of pavé stones. Soft, feminine, unmistakably ZAVEL.',
    image_url: '/assets/images/enamel-bow-earrings.jpg',
    is_featured: true,
  },
  {
    id: 'seed-gold-sphere-studs',
    name: 'Gold Sphere Studs',
    category: 'Earrings',
    price: 95,
    description:
      'Mirror-polished gold sphere studs — a modern staple that pairs with everything, worn on their own or stacked.',
    image_url: '/assets/images/gold-sphere-studs.jpg',
    is_featured: false,
  },
  {
    id: 'seed-silver-sphere-studs',
    name: 'Silver Sphere Studs',
    category: 'Earrings',
    price: 85,
    description:
      'The cool-tone companion to our Gold Sphere Studs — polished sterling silver spheres with a secure friction back.',
    image_url: '/assets/images/silver-sphere-studs.jpg',
    is_featured: false,
  },
]
