import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventsPage from './page';

// Mock de la API
jest.mock('@/lib/api', () => ({
  getEvents: jest.fn(() => Promise.resolve([
    {
      id: 1,
      title: 'Real Madrid vs Barcelona',
      description: 'Clásico español',
      odds: { home: 2.5, away: 2.8, draw: 3.2 },
      status: 'active',
      startDate: '2024-01-15T20:00:00Z'
    },
    {
      id: 2,
      title: 'Manchester United vs Liverpool',
      description: 'Derby inglés',
      odds: { home: 2.1, away: 3.1, draw: 3.5 },
      status: 'active',
      startDate: '2024-01-16T19:30:00Z'
    }
  ])),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('EventsPage', () => {
  it('muestra el título correcto de la página', () => {
    renderWithProviders(<EventsPage />);
    expect(screen.getByText('Eventos Deportivos Disponibles')).toBeInTheDocument();
  });

  it('muestra un estado de carga inicialmente', () => {
    renderWithProviders(<EventsPage />);
    // Verificar que hay un loader (SVG con clase animate-spin)
    const loader = document.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });
}); 