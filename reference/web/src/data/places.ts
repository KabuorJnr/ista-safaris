export interface Place {
  id: string
  n: string
  name: string
  tagline: string
  kind: string
  lat: number
  lng: number
}

// Pin positions follow the design. Check each against an official source before launch.
export const PLACES: Place[] = [
  { id: 'voi', n: '01', name: 'Voi', tagline: 'Your gateway to Tsavo East', kind: 'Gateway town', lat: -3.399, lng: 38.53 },
  { id: 'aruba-dam', n: '02', name: 'Aruba Dam', tagline: 'Elephants and water birds', kind: 'Waterhole', lat: -3.055, lng: 38.685 },
  { id: 'taita-hills', n: '03', name: 'Taita Hills', tagline: 'Cloud forests and viewpoints', kind: 'Highlands', lat: -3.4, lng: 38.321 },
  { id: 'mzima-springs', n: '04', name: 'Mzima Springs', tagline: 'Hippos and crystal-clear water', kind: 'Natural spring', lat: -2.996, lng: 38.006 },
  { id: 'lake-jipe', n: '05', name: 'Lake Jipe', tagline: 'Wetlands beneath Kilimanjaro', kind: 'Wetland', lat: -3.582, lng: 37.74 },
  { id: 'lumo', n: '06', name: 'Lumo Sanctuary', tagline: 'Community-led conservation', kind: 'Conservancy', lat: -3.501, lng: 38.315 },
]

export const findPlace = (q: string) => {
  const t = q.trim().toLowerCase()
  return PLACES.find((p) => p.name.toLowerCase() === t) ?? PLACES.find((p) => (p.name + ' ' + p.tagline + ' ' + p.kind).toLowerCase().includes(t))
}

export const MAP_VIEW = { center: [-3.33, 38.21] as [number, number], zoom: 9.62 }
