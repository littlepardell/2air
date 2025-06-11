import { villas } from '@/data/villas'
import { VillaCard } from './VillaCard'

export function VillaGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {villas.map(villa => (
        <VillaCard key={villa.id} villa={villa} />
      ))}
    </div>
  )
}
