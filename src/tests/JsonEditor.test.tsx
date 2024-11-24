// @ts-ignore
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JsonEditor from '../components/JsonEditor';  // Adjust the import path as needed
import { toast } from 'react-toastify';

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('JsonEditor', () => {
  const mockOnUpdate = jest.fn();

  const jsonData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    companySize: 'Medium',
    industry: 'Tech',
    timeline: '2024-12-01',
  };

  beforeEach(() => {
    mockOnUpdate.mockClear();  // Clear any previous calls
    jest.clearAllMocks();
    // jest.resetAllMocks;
  });
  afterEach(() => {
    // mockOnUpdate.mockClear();  // Clear any previous calls
    jest.clearAllMocks();
    // jest.resetAllMocks;
  });

  test('shows toast error on download if form is incomplete', async () => {
    const incompleteJsonData = {
      name: '',
      email: 'john.doe@example.com',
      companySize: 'Medium',
      industry: 'Tech',
      timeline: '2024-12-01',
    };

    render(<JsonEditor jsonData={incompleteJsonData} onUpdate={mockOnUpdate} />);

    const downloadButton = screen.getByRole('button', { name: /download json/i });

    // Simulate click on the download button
    screen.debug(downloadButton)
    userEvent.click(downloadButton);

    // Ensure toast error is shown because the form is incomplete
    await waitFor(()=> {
      expect(toast.error).toHaveBeenCalledWith('You must fill out the form completely and correctly before downloading the data.');
    })
  });

  it('renders initial JSON data correctly', async () => {
    render(<JsonEditor jsonData={jsonData} onUpdate={mockOnUpdate} />);

    // Verify that the initial JSON is rendered correctly in the textarea
    const textarea = screen.getByTestId('textBox');
    // @ts-ignore
    console.log(textarea.value);
    // screen.debug(textarea.value)
    // @ts-ignore
    expect(textarea.value).toBe(JSON.stringify(jsonData, null, 2));


  });

  test('handles valid JSON input change', async () => {
    render(<JsonEditor jsonData={jsonData} onUpdate={mockOnUpdate} />);

    const textarea = screen.getByRole('textbox');
    const newText = `{
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "companySize": "Large",
      "industry": "Finance",
      "timeline": "2024-12-15"
    }`;
  
    // Simulate typing in the textarea
    fireEvent.change(textarea, { target: { value: newText } });
  
    // Check if the value has been updated
    // @ts-ignore
    expect(textarea.value).toBe(newText);

    // Wait for the mock onUpdate to be called
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({"companySize": "Large", "email": "jane.doe@example.com", "industry": "Finance", "name": "Jane Doe", "timeline": "2024-12-15"});
    });
  });

  test('shows error for invalid JSON input', () => {
    render(<JsonEditor jsonData={jsonData} onUpdate={mockOnUpdate} />);

    const textarea = screen.getByRole('textbox');
    const invalidJson = '{"name": "John Doe", "email": "john.doe@example.com",';

    // Simulate user typing an invalid JSON
    userEvent.type(textarea, invalidJson);
    expect(textarea).toHaveValue(invalidJson);

    // Check for error message
    const errorMessage = screen.getByText('Invalid JSON format.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('handles save button click', async () => {
    render(<JsonEditor jsonData={jsonData} onUpdate={mockOnUpdate} />);

    const saveButton = screen.getByRole('button', { name: /update json/i });

    // Simulate click on the update button
    fireEvent.click(saveButton);

    // Ensure that the mockOnUpdate is called with the correct updated JSON
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(JSON.stringify(jsonData, null, 2));
    });
  });

  test('handles download button click when form is valid', async () => {
    render(<JsonEditor jsonData={jsonData} onUpdate={mockOnUpdate} />);

    const downloadButton = screen.getByRole('button', { name: /download json/i });

    // Simulate click on the download button
    userEvent.click(downloadButton);

    // Ensure toast is not called because the form is valid
    expect(toast.error).not.toHaveBeenCalled();

    // Check that the download button triggers a Blob download
    // You can mock the download process if necessary
    // Add further checks based on how you want to validate the file download
  });


});
