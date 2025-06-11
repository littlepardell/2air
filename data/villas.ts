import villasData from '../villas.json';

export interface Villa {
  id: string;
  title: string;
  description: string;
  location: string; // This field is not in villas.json, will be empty or a default value
  coverImage: string;
  images: string[];
  services: string[];
  fullDescription: string;
}

const processedVillas: Villa[] = villasData.map((villa) => {
  const id = villa.title.toLowerCase().replace(/\s+/g, '-');
  const coverImage = villa.images.length > 0 ? `/${villa.images[0]}` : '/placeholder.jpg'; // Added placeholder for empty images
  const images = villa.images.map(image => `/${image}`);
  const services = villa.services.split(',').map(service => service.trim());
  const fullDescription = villa.description;
  const description = fullDescription.length > 50 ? `${fullDescription.substring(0, 50)}...` : fullDescription;

  return {
    id,
    title: villa.title,
    description,
    location: '', // Set location to empty string as it's not in villas.json
    coverImage,
    images,
    services,
    fullDescription,
  };
});

export const villas: Villa[] = processedVillas;

export function getVilla(id: string): Villa | undefined {
  return villas.find(villa => villa.id === id);
}
