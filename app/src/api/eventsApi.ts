import { Event } from '../types';

const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=12';

const CATEGORIES = ['Pregrado', 'Posgrado', 'Educación Continua'];

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(JSON_PLACEHOLDER_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Mapear los datos de JSONPlaceholder a nuestra interfaz Event
    return data.map((item: any, index: number) => ({
      id: item.id,
      name: item.title.split(' ').slice(0, 4).join(' ').replace(/^\w/, (c: string) => c.toUpperCase()),
      category: CATEGORIES[index % CATEGORIES.length],
      description: item.body.charAt(0).toUpperCase() + item.body.slice(1),
      imageUrl: `https://picsum.photos/seed/${item.id}/600/400`,
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

