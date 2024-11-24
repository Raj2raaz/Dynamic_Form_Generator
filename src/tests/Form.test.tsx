// @ts-ignore
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";
import '@testing-library/jest-dom';
// import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";


// Sample onSubmit function
const onSubmit = jest.fn();

// Sample form data
const formData = {
  name: "",
  email: "",
  companySize: "",
  industry: "",
  timeline: "",
  comments: "",
};

describe("Form", () => {
  beforeEach(() => {
    // @ts-ignore
    render(<Form onSubmit={onSubmit} formData={formData} />);
  });

  it("should render the form with all fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comments/i)).toBeInTheDocument();
  });

  it("should display an error message for required fields when submitting with empty form", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    screen.debug(submitButton)
    userEvent.click(submitButton);

    // Wait for the error messages to appear
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
      expect(screen.getByText(/company size is required/i)).toBeInTheDocument();
      expect(screen.getByText(/industry is required/i)).toBeInTheDocument();
      expect(screen.getByText(/timeline is required/i)).toBeInTheDocument();
    });
  });

  it("should display an error message for invalid email format", async () => {
    // Fill in the form with invalid email
    userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("should submit valid data correctly", async () => {
    // Fill in the form with valid data
    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
    userEvent.selectOptions(screen.getByLabelText(/company size/i), "51-200");
    userEvent.click(screen.getByLabelText(/tech/i)); // Select "tech" industry
    userEvent.selectOptions(screen.getByLabelText(/timeline/i), "short");
    userEvent.type(screen.getByLabelText(/comments/i), "Looking forward to the project.");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // Wait for the form to be submitted
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john.doe@example.com",
        companySize: "51-200",
        industry: "tech",
        timeline: "short",
        comments: "Looking forward to the project.",
      });
    });
  });

  it("should reset form values when formData changes", async () => {
    // const newFormData = {
    //   name: "Jane Doe",
    //   email: "jane.doe@example.com",
    //   companySize: "1-50",
    //   industry: "healthcare",
    //   timeline: "medium",
    //   comments: "Ready to start.",
    // };

    // Simulate changing form data
    // render(<Form onSubmit={onSubmit} formData={} />);
    // userEvent.click(screen.getAllByTestId(/resetBtn/i))
    // Check that form values are reset
    // const nameInput = screen.getByLabelText(/name/i);
    // // userEvent.clear(nameInput);
    // userEvent.type(nameInput, "Jane Doe");

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: "jane.doe@example.com" } });

  // Simulate changing the 'company size' field
  const companySizeInput = screen.getByLabelText(/company size/i);
  fireEvent.change(companySizeInput, { target: { value: "1-50" } });

  // Simulate clicking the 'healthcare' checkbox
  const healthcareCheckbox = screen.getByLabelText(/healthcare/i);
  fireEvent.click(healthcareCheckbox);


    screen.debug(screen.getByLabelText(/name/i))
    expect(screen.getByLabelText(/name/i)).toHaveValue("Jane Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("jane.doe@example.com");
    expect(screen.getByLabelText(/company size/i)).toHaveValue("1-50");
    expect(screen.getByLabelText(/healthcare/i)).toBeChecked();

    userEvent.click(screen.getByTestId(/resetBtn/i)) ;
    await waitFor(()=>{
      expect(screen.getByLabelText(/name/i)).toHaveValue("");
      expect(screen.getByLabelText(/email/i)).toHaveValue("");
      expect(screen.getByLabelText(/company size/i)).toHaveValue("");
      expect(screen.getByLabelText(/healthcare/i)).not.toBeChecked();
    })


  });
});
