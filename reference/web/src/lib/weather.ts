// Live conditions for Tsavo East from Open-Meteo (free, no key). Returns null when offline or on error.
const CODES: [number[], string][] = [
  [[0], 'Clear skies'], [[1], 'Mostly clear'], [[2], 'Partly cloudy'], [[3], 'Overcast'], [[45, 48], 'Fog'],
  [[51, 53, 55, 56, 57], 'Drizzle'], [[61, 63, 65, 66, 67, 80, 81, 82], 'Rain'], [[95, 96, 99], 'Thunderstorms'],
]
export async function tsavoWeather(): Promise<{ temp: number; label: string } | null> {
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-2.98&longitude=38.47&current=temperature_2m,weather_code&timezone=Africa%2FNairobi')
    const j = await r.json()
    const code: number = j.current.weather_code
    return { temp: Math.round(j.current.temperature_2m), label: CODES.find(([c]) => c.includes(code))?.[1] ?? 'Fair' }
  } catch { return null }
}
