import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with children text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders as a button when no href is provided', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/menu">Go to Menu</Button>);
    const linkElement = screen.getByRole('link', { name: /Go to Menu/i });
    expect(linkElement).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('bg-gold-600');
  });

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('bg-deepRed-600');
  });

  it('applies outline variant styles when specified', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('border-2');
    expect(buttonElement.className).toContain('border-gold-600');
  });
});