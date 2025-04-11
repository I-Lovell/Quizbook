import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "../../src/contexts/CurrentUserContext";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

vi.mock("../../src/services/posts", () => ({
  getPosts: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  const navigateMock = vi.fn();
  return { ...actual, useNavigate: () => navigateMock };
});

const renderWithRouterAndProvider = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>, { wrapper: CurrentUserProvider });
};

describe("FeedPage", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts sorted by newest first", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [
      { _id: "1", question: "Older Post", created_at: "2023-01-01T00:00:00Z" },
      { _id: "2", question: "Newer Post", created_at: "2023-02-01T00:00:00Z" },
    ];

    getPosts.mockResolvedValue({ posts: mockPosts });

    renderWithRouterAndProvider(<FeedPage />);

    const posts = await screen.findAllByRole("article");
    expect(posts[0].textContent).toContain("Newer Post");
    expect(posts[1].textContent).toContain("Older Post");
  });

  test("It navigates to login if no token is present", () => {
    renderWithRouterAndProvider(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("It opens and closes the modal for creating a new post", () => {
    window.localStorage.setItem("token", "testToken");

    renderWithRouterAndProvider(<FeedPage />);

    const openModalButton = screen.getByText("Make a New Post");
    fireEvent.click(openModalButton);

    expect(screen.getByText("Submit")).toBeInTheDocument();

    const closeModalButton = screen.getByText("Close");
    fireEvent.click(closeModalButton);

    expect(screen.queryByText("Create Post")).not.toBeInTheDocument();
  });
});
