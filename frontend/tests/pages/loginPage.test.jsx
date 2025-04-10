import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { login } from "../../src/services/authentication"; // Ensure this path is correct

const navigateMock = vi.fn();

vi.mock("../../src/services/authentication", () => ({
  login: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock, Link: ({ to, children }) => <a href={to}>{children}</a> };
});

describe("Login Page", () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("allows a user to login", async () => {
    login.mockResolvedValue({ token: "testToken" });

    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(login).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("navigates to /posts on successful login", async () => {
    login.mockResolvedValue({ token: "testToken" });

    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await screen.findByText("Logging in...");
    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });

  test("navigates to /login on unsuccessful login", async () => {
    login.mockRejectedValue(new Error("Invalid credentials"));

    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await screen.findByText("Invalid credentials");
    expect(navigateMock).not.toHaveBeenCalledWith("/posts");
  });
});
