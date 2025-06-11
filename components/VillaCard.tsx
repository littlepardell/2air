import Image from 'next/image'
import Link from 'next/link'
import { Villa } from '@/data/villas'

interface VillaCardProps {
  villa: Villa
}

export function VillaCard({ villa }: VillaCardProps) {
  return (
    <Link href={`/villa/${villa.id}`} className="block">
      <div className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
        <div className="relative aspect-[4/3]">
          <Image
            src={villa.coverImage}
            alt={villa.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{villa.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{villa.location}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{villa.description}</p>
        </div>
      </div>
    </Link>
  )
}
