import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock the global fetch function
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial loading state', () => {
    // Simulate pending fetch calls
    fetch.mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByText('DevOps Frontend Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Loading status...')).toBeInTheDocument();
    expect(screen.getByText('Loading backend elements...')).toBeInTheDocument();
  });

  it('renders health and elements data on success', async () => {
    // Mock successful API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'OK', uptime: 42.123, timestamp: Date.now() }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 1, name: 'Elemento A', description: 'Descripción de prueba A' },
          { id: 2, name: 'Elemento B', description: 'Descripción de prueba B' }
        ],
      });

    render(<App />);

    // Wait for the UI update after API resolutions
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.getByText('Loaded')).toBeInTheDocument();
      expect(screen.getByText('Elemento A')).toBeInTheDocument();
      expect(screen.getByText('Descripción de prueba A')).toBeInTheDocument();
      expect(screen.getByText('Elemento B')).toBeInTheDocument();
      expect(screen.getByText('Descripción de prueba B')).toBeInTheDocument();
    });
  });

  it('renders error messages when fetch fails', async () => {
    // Mock API failures
    fetch.mockRejectedValue(new Error('Network connection failed'));

    render(<App />);

    // Wait for the UI update with errors
    await waitFor(() => {
      expect(screen.getAllByText('Error')).toHaveLength(2);
      expect(screen.getByText(/Error connecting to backend:/)).toBeInTheDocument();
      expect(screen.getByText(/Error fetching data:/)).toBeInTheDocument();
    });
  });
});
