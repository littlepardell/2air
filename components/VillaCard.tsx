import Image from 'next/image'
import Link from 'next/link'

interface VillaCardProps {
  id: string
  title: string
  description: string
  image: string
  location: string
}

export function VillaCard({ id, title, description, image, location }: VillaCardProps) {
  return (
    <Link href={`/villa/${id}`}>
      <div className="group rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] dark:bg-gray-800">
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{location}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  )
}
