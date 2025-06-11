'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No hay imágenes disponibles.</p>
        {/* Optionally, display a placeholder image */}
        {/* <Image src="/placeholder.jpg" alt="No image available" fill className="object-cover" /> */}
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative group">
      {/* Imagen principal */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={images[currentImage]}
          alt="Villa view"
          fill
          className="object-cover transition-transform duration-500"
          priority
        />
      </div>

      {/* Controles */}
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Miniaturas */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setCurrentImage(index)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden
              ${currentImage === index ? 'ring-2 ring-primary' : ''}`}
          >
            <Image
              src={image}
              alt={`Villa thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
