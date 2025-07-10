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
    register: jest.fn(),
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

describe('RegisterPage', () => {
  it('muestra el formulario de registro', () => {
    // Importar dinámicamente para evitar problemas con el router
    const RegisterPage = require('./page').default;
    renderWithProviders(<RegisterPage />);
    
    const registerTexts = screen.getAllByText('Crear Cuenta');
    expect(registerTexts.length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });
}); 