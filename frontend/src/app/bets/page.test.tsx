import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BetsPage from './page';

// Mock de la API
jest.mock('@/lib/api', () => ({
  getBets: jest.fn(() => Promise.resolve([
    {
      id: 1,
      eventTitle: 'Real Madrid vs Barcelona',
      selectedOption: 'home',
      amount: 100,
      potentialWin: 250,
      status: 'pending',
      createdAt: '2024-01-10T15:30:00Z'
    },
    {
      id: 2,
      eventTitle: 'Manchester United vs Liverpool',
      selectedOption: 'away',
      amount: 50,
      potentialWin: 155,
      status: 'won',
      createdAt: '2024-01-09T14:20:00Z'
    }
  ])),
}));

// Mock del contexto de autenticación
jest.mock('@/lib/auth-context', () => ({
  useAuth: () => ({
    user: { id: 1, name: 'Usuario Demo', email: 'demo@example.com' },
    isLoading: false,
  }),
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

describe('BetsPage', () => {
  it('muestra el título correcto de la página', () => {
    renderWithProviders(<BetsPage />);
    expect(screen.getByText('Historial de Apuestas')).toBeInTheDocument();
  });

  it('muestra un estado de carga inicialmente', () => {
    renderWithProviders(<BetsPage />);
    // Verificar que hay un loader (SVG con clase animate-spin)
    const loader = document.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });
}); 