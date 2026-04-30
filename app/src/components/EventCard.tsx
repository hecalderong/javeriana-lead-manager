import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    Pregrado: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Posgrado: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Educación Continua': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
          <span className="text-white text-xs font-medium">Click para ver detalles</span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full font-bold shadow-sm ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight mb-2 group-hover:text-javeriana dark:group-hover:text-blue-400 transition-colors">
          {event.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
          {event.description}
        </p>
        
        <button className="w-full py-2.5 px-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-javeriana hover:text-white dark:hover:bg-javeriana text-javeriana dark:text-blue-400 font-semibold rounded-xl transition-all duration-300 text-sm border border-gray-100 dark:border-gray-600">
          Más información
        </button>
      </div>
    </div>
  );
};


export default EventCard;