import { VillaGrid } from '@/components/VillaGrid'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nuestras Villas</h1>
        <ThemeToggle />
      </div>
      <VillaGrid />
    </main>
  )
}
