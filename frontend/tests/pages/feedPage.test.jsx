import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts sorted by newest first", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [
      { _id: "1", question: "Older Post", created_at: "2023-01-01T00:00:00Z" },
      { _id: "2", question: "Newer Post", created_at: "2023-02-01T00:00:00Z" },
    ];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const posts = await screen.findAllByRole("article");
    expect(posts[0].textContent).toContain("Newer Post");
    expect(posts[1].textContent).toContain("Older Post");
  });

  test("It navigates to login if no token is present", () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("It opens and closes the modal for creating a new post", () => {
    window.localStorage.setItem("token", "testToken");

    render(<FeedPage />);

    const openModalButton = screen.getByText("Make a New Post");
    fireEvent.click(openModalButton);

    expect(screen.getByText("Create Post")).toBeInTheDocument();

    const closeModalButton = screen.getByText("Close");
    fireEvent.click(closeModalButton);

    expect(screen.queryByText("Create Post")).not.toBeInTheDocument();
  });
});
