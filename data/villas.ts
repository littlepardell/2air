export interface Villa {
  id: string;
  title: string;
  description: string;
  location: string;
  coverImage: string;
  images: string[];
  services: string[];
  fullDescription: string;
}

export const villas: Villa[] = [
  {
    id: 'neptuno',
    title: 'VILLA NEPTUNO',
    description: 'Maravillosa Villa con vistas al mar',
    location: 'Tossa de Mar',
    coverImage: '/images/villas/neptuno/cover.jpg',
    images: [
      '/images/villas/neptuno/1.jpg',
      '/images/villas/neptuno/2.jpg',
      '/images/villas/neptuno/3.jpg',
      // Añade más imágenes según necesites
    ],
    services: [
      'Piscina privada',
      'Jardín',
      'WiFi',
      'Aire acondicionado',
      'Parking'
    ],
    fullDescription: 'Maravillosa Villa, situada en la preciosa localidad de Tossa de Mar. Ubicada en paraje idílico junto al mar...'
  }
  // Puedes añadir más villas aquí
];

export function getVilla(id: string): Villa | undefined {
  return villas.find(villa => villa.id === id);
}
