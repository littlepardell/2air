import { VillaDetail } from '@/components/VillaDetail'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function VillaPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-primary hover:underline">
          ← Volver
        </Link>
        <ThemeToggle />
      </div>
      <VillaDetail id={params.id} />
    </main>
  )
}
