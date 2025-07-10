import { render, screen } from '@testing-library/react';
import { Navbar } from './navbar';

// Mock del contexto de autenticación
jest.mock('../../lib/auth-context', () => ({
  useAuth: () => ({
    user: { id: 1, name: 'Usuario Demo', email: 'demo@example.com', balance: 1000 },
    logout: jest.fn(),
    isLoading: false,
  }),
}));

describe('Navbar', () => {
  it('muestra el logo de la aplicación', () => {
    render(<Navbar />);
    expect(screen.getByText('Apuestas Deportivas')).toBeInTheDocument();
  });

  it('muestra los enlaces de navegación principales', () => {
    render(<Navbar />);
    
    expect(screen.getByRole('link', { name: 'Eventos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mis Apuestas' })).toBeInTheDocument();
  });

  it('muestra el balance del usuario', () => {
    render(<Navbar />);
    expect(screen.getByText('Balance: $1000.00')).toBeInTheDocument();
  });

  it('muestra el botón de cerrar sesión', () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
}); 