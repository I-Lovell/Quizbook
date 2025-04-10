import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { signup } from "../../src/services/authentication";

const navigateMock = vi.fn();

vi.mock("../../src/services/authentication", () => ({
  signup: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock, Link: ({ to, children }) => <a href={to}>{children}</a> };
});

describe("Signup Page", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    signup.mockReset(); // Reset the signup mock before each test
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("allows a user to signup", async () => {
    signup.mockResolvedValue(); // Mock successful signup

    renderWithRouter(<SignupPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signupButton = screen.getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  test("navigates to /login on successful signup", async () => {
    signup.mockResolvedValue();

    renderWithRouter(<SignupPage />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signupButton = screen.getByText("Sign Up");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    signup.mockRejectedValue(new Error("Password must be at least 3 characters long"));

    renderWithRouter(<SignupPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signupButton = screen.getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(signupButton);

    await screen.findByText("Password must be at least 3 characters long");
    expect(navigateMock).not.toHaveBeenCalledWith("/login");
  });
});
