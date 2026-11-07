// Copy and figures shown in the design. Items marked CHECK must be backed by real data before launch.
export type Nearby = { id: string; name: string; category: 'Wildlife' | 'Landmarks'; rating: string; desc: string; km: string; drive: string; image: string; to: string }

export const NEARBY: Nearby[] = [
  { id: 'aruba', name: 'Aruba Dam', category: 'Wildlife', rating: '4.8', desc: 'Elephants gather here in the late afternoon.', km: '2.4 km', drive: '8 min drive', image: '/images/aruba-dam.jpg', to: 'Aruba Dam' }, // CHECK rating
  { id: 'mudanda', name: 'Mudanda Rock', category: 'Landmarks', rating: '4.7', desc: 'A panoramic lookout over the Tsavo plains.', km: '18 km', drive: '31 min drive', image: '/images/mudanda-rock.jpg', to: 'Mudanda Rock, Kenya' }, // CHECK rating
  { id: 'lion', name: 'Lion Ridge', category: 'Wildlife', rating: '4.9', desc: 'A quiet track known for early morning sightings.', km: '7.8 km', drive: '16 min drive', image: '/images/lion-ridge.jpg', to: 'Tsavo East National Park' }, // CHECK rating
]

export const DISCOVER = [
  { id: 'wildlife', title: 'Wildlife', sub: '64 sightings' }, // CHECK
  { id: 'landmarks', title: 'Landmarks', sub: '18 places' }, // CHECK
  { id: 'stays', title: 'Stays', sub: '24 lodges' }, // CHECK
  { id: 'culture', title: 'Culture', sub: '12 stories' }, // CHECK
]

export const REGION_SIZE = '482 MB' // CHECK against the real offline pack size
