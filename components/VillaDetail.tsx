import { getVilla } from '@/data/villas'
import { ImageGallery } from './ImageGallery'
import { Button } from './ui/button'
import { notFound } from 'next/navigation'
import { Check, MessageCircle } from 'lucide-react'

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
    window.open(`https://wa.me/+34600000000?text=${message}`, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Galería de imágenes a ancho completo */}
      <div className="mb-8">
        <ImageGallery images={villa.images} />
      </div>

      {/* Contenido principal en dos columnas en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{villa.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{villa.location}</p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">{villa.fullDescription}</p>
          </div>
        </div>

        {/* Barra lateral */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
              <ul className="space-y-3">
                {villa.services.map(service => (
                  <li key={service} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              size="lg"
              className="w-full gap-2"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-5 w-5" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
