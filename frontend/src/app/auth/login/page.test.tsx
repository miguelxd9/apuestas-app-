import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock de Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock del contexto de autenticación
jest.mock('@/lib/auth-context', () => ({
  useAuth: () => ({
    login: jest.fn(),
    user: null,
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

describe('LoginPage', () => {
  it('muestra el formulario de login', () => {
    // Importar dinámicamente para evitar problemas con el router
    const LoginPage = require('./page').default;
    renderWithProviders(<LoginPage />);
    
    const loginTexts = screen.getAllByText('Iniciar Sesión');
    expect(loginTexts.length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
  });
}); 