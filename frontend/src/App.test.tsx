import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProvider } from './state';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renders dashboard', () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
