import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactionTimesPage from '../views/ReactionTimesPage';
import { BrowserRouter as Router } from 'react-router-dom';
import api from '../utils/api';
import { jwtDecode } from 'jwt-decode';

jest.mock('../utils/api');
jest.mock('jwt-decode');

describe('ReactionTimesPage Component', () => {
  test('renders reaction times and sorts them', async () => {
    const mockToken = 'mock-token';
    const mockId = 'user_id';
    jwtDecode.mockReturnValue({ id: mockId });
    api.get.mockResolvedValueOnce({
      data: [
        { time: 300 },
        { time: 150 },
        { time: 200 }
      ]
    });

    localStorage.setItem('token', mockToken);

    render(
      <Router>
        <ReactionTimesPage />
      </Router>
    );

    expect(jwtDecode).toHaveBeenCalledWith(mockToken);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/150\s*ms/i)).toBeInTheDocument();
    expect(screen.getByText(/200\s*ms/i)).toBeInTheDocument();
    expect(screen.getByText(/300\s*ms/i)).toBeInTheDocument();
  });

  test('shows error message on failed fetch', async () => {
    const mockToken = 'mock-token';
    jwtDecode.mockReturnValue({ id: 'user-id' });
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    localStorage.setItem('token', mockToken);

    render(
      <Router>
        <ReactionTimesPage />
      </Router>
    );

    expect(jwtDecode).toHaveBeenCalledWith(mockToken);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Failed to fetch reaction times')).toBeInTheDocument();
  });
});
