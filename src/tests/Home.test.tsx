// @ts-ignore
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home'; // Adjust the import path if necessary
import '@testing-library/jest-dom'; // For additional matchers like 'toBeInTheDocument'

// Test case for Home component
describe('Home Component', () => {
  
  // Test if JSON editor and form render correctly
  it('renders JsonEditor and Form components correctly', () => {
    render(<Home />);

    // Check if the JSON editor is rendered
    const jsonEditorHeading = screen.getByText('JSON Editor');
    expect(jsonEditorHeading).toBeInTheDocument();

    // Check if the form is rendered
    const formHeading = screen.getByText('Form');
    expect(formHeading).toBeInTheDocument();

    // Check if initial JSON fields are present in the form
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  // Test for updating formData via JSON editor
  it('updates formData when JSON is modified in JsonEditor', () => {
    render(<Home />);

    // Get the JSON editor textarea and update the JSON input
    const jsonInput = screen.getByRole('textbox');
    fireEvent.change(jsonInput, { target: { value: '{"name": "John", "email": "john@example.com"}' } });

    // Verify that the form fields are updated accordingly
    expect(screen.getByLabelText('Name')).toHaveValue('John');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
  });

  // Test for form submission
  it('updates formData when form is submitted', () => {
    render(<Home />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });

    // Submit the form
    fireEvent.click(screen.getByText('Submit')); // Adjust button text if necessary

    // Verify that the formData state has been updated
    expect(screen.getByLabelText('Name')).toHaveValue('Jane');
    expect(screen.getByLabelText('Email')).toHaveValue('jane@example.com');
  });
  
});
