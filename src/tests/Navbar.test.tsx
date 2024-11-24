import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar'; // Adjust the import path if necessary
import '@testing-library/jest-dom'; // For additional matchers like 'toBeInTheDocument'

// Test case for Navbar component
describe('Navbar Component', () => {
  
  // Test for rendering Navbar
  it('renders Navbar correctly', () => {
    render(<Navbar />);
    
    // Check if the "Dynamic Form Generation" heading is in the document
    const heading = screen.getByText('Dynamic Form Generation');
    expect(heading).toBeInTheDocument();

    // Check if the button is in the document
    const toggleButton = screen.getByText('DRK'); // Initially it should say "DRK"
    expect(toggleButton).toBeInTheDocument();
  });

  // Test for toggling dark mode
  it('toggles dark mode when button is clicked', () => {
    render(<Navbar />);

    // Get the button and click it
    const toggleButton = screen.getByText('DRK');
    fireEvent.click(toggleButton);

    // Check if the dark class is added to the document
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Now the button text should change to "LHT"
    expect(screen.getByText('LHT')).toBeInTheDocument();

    // Click again to toggle back
    fireEvent.click(toggleButton);

    // Check if the dark class is removed
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Now the button text should change back to "DRK"
    expect(screen.getByText('DRK')).toBeInTheDocument();
  });
});
