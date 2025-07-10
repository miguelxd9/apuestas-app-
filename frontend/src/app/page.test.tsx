import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('muestra el título principal', () => {
    render(<HomePage />);
    expect(screen.getByText('Apuestas Deportivas')).toBeInTheDocument();
  });
}); 