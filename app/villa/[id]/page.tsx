import { VillaDetail } from '@/components/VillaDetail'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function VillaPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <span>←</span> Volver a villas
        </Link>
        <ThemeToggle />
      </div>
      <VillaDetail id={params.id} />
    </main>
  )
}
