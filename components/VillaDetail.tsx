import { getVilla } from '@/data/villas'
import { ImageGallery } from './ImageGallery'
import { Button } from './ui/button'
import { notFound } from 'next/navigation'

interface VillaDetailProps {
  id: string
}

export function VillaDetail({ id }: VillaDetailProps) {
  const villa = getVilla(id)
  
  if (!villa) {
    notFound()
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, estoy interesado/a en la ${villa.title}`)
    window.open(`https://wa.me/TUNUMERO?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-8">
      <ImageGallery images={villa.images} />
      <h1 className="text-4xl font-bold">{villa.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">{villa.location}</p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{villa.fullDescription}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Servicios</h2>
        <ul className="grid grid-cols-2 gap-4">
          {villa.services.map(service => (
            <li key={service} className="flex items-center gap-2">
              <span>✓</span> {service}
            </li>
          ))}
        </ul>
      </div>
      <Button 
        size="lg"
        className="w-full md:w-auto mt-8"
        onClick={handleWhatsAppClick}
      >
        Contactar por WhatsApp
      </Button>
    </div>
  )
}
