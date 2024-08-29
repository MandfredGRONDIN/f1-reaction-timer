import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../views/Home';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home Component', () => {
  test('renders home page content', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Welcome to the Reaction Timer App')).toBeInTheDocument();
    expect(screen.getByText('Track your reaction times and improve your performance!')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
