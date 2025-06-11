import { ImageGallery } from './ImageGallery'
import { Button } from './ui/button'

interface VillaDetailProps {
  id: string
}

export function VillaDetail({ id }: VillaDetailProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, estoy interesado/a en la Villa ${id}`)
    window.open(`https://wa.me/TUNUMERO?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-8">
      <ImageGallery />
      <h1 className="text-4xl font-bold">VILLA NOMBRE</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Descripción detallada de la villa...</p>
        <h2>Servicios</h2>
        <ul>
          <li>Piscina privada</li>
          <li>Jardín</li>
          <li>WiFi</li>
          {/* Más servicios... */}
        </ul>
      </div>
      <Button 
        size="lg"
        className="w-full md:w-auto"
        onClick={handleWhatsAppClick}
      >
        Contactar por WhatsApp
      </Button>
    </div>
  )
}
