import { useState, useEffect, useMemo } from 'react';
import { LeadProvider } from './context/LeadContext';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import EventList from './components/EventList';
import FilterBar from './components/FilterBar';
import { Event, CategoryOption } from './types';
import { fetchEvents } from './api/eventsApi';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') ||
      localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('No se pudieron cargar los eventos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return Array.from(cats);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  return (
    <LeadProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <header className="bg-javeriana text-white shadow-lg py-6 mb-8 sticky top-0 z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="text-center flex-1">
              <h1 className="text-2xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <span>🎓</span> Javeriana Lead Manager
              </h1>
              <p className="mt-1 text-sm opacity-90 hidden md:block text-blue-100">Gestión de interesados y eventos académicos</p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Alternar modo oscuro"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L5.99 12.364l1.171 1.171" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Formulario de Registro */}
            <div className="lg:col-span-1 space-y-8">
              <LeadForm />
              <LeadList />
            </div>

            {/* Columna Derecha: Listado de Eventos y Filtros */}
            <div className="lg:col-span-2 space-y-6">
              <FilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
              />
              <EventList
                events={filteredEvents}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 mt-12 py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t dark:border-gray-700 transition-colors duration-500">
          <div className="container mx-auto px-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Pontificia Universidad Javeriana</p>
            <p className="mt-1">Prueba Técnica Frontend <a href="https://www.linkedin.com/in/developerhcode/">HE_Calderon</a> © {new Date().getFullYear()}</p>
            <p className="mt-2 text-xs opacity-75">Datos consumidos de JSONPlaceholder API • Imágenes por Picsum Photos</p>
          </div>
        </footer>
      </div>
    </LeadProvider>
  );
}


export default App;