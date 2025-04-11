import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { login, signup } from "../../src/services/authentication"; // Include signup
import { CurrentUserProvider } from "../../src/contexts/CurrentUserContext";

const navigateMock = vi.fn();

vi.mock("../../src/services/authentication", () => ({
  login: vi.fn(),
  signup: vi.fn(), // Mock signup
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock, Link: ({ to, children }) => <a href={to}>{children}</a> };
});

describe("Login Page", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    signup.mockReset(); // Reset signup mock
    login.mockReset(); // Reset login mock
  });

  const renderWithRouterAndProvider = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>, { wrapper: CurrentUserProvider });
  };

  test("allows a user to create an account and then login", async () => {
    signup.mockResolvedValue(); // Mock successful signup
    login.mockResolvedValue({ token: "testToken" }); // Mock successful login

    // Simulate account creation
    await signup("test@example.com", "password123", "testUser");
    expect(signup).toHaveBeenCalledWith("test@example.com", "password123", "testUser");

    // Render login page and perform login
    renderWithRouterAndProvider(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "" }); // Target the button with an empty accessible name

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(login).toHaveBeenCalledWith("test@example.com", "password123");
    await screen.findByText("Logging in...");
    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });

  test("navigates to /login on unsuccessful login", async () => {
    login.mockRejectedValue(new Error("Invalid credentials"));

    renderWithRouterAndProvider(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "" }); // Target the button with an empty accessible name

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await screen.findByText("Invalid credentials");
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
