import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { fetchSelfPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

vi.mock("../../src/services/posts", () => ({
  fetchSelfPosts: vi.fn(),
}));

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock };
});

describe("ProfilePage", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays user posts sorted by newest first", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [
      { _id: "1", question: "Older Post", created_at: "2023-01-01T00:00:00Z" },
      { _id: "2", question: "Newer Post", created_at: "2023-02-01T00:00:00Z" },
    ];

    fetchSelfPosts.mockResolvedValue({ posts: mockPosts });

    render(<ProfilePage />);

    const posts = await screen.findAllByRole("article");
    expect(posts[0].textContent).toContain("Newer Post");
    expect(posts[1].textContent).toContain("Older Post");
  });

  test("It toggles between editing and viewing profile details", () => {
    window.localStorage.setItem("token", "testToken");

    render(<ProfilePage />);

    const editButton = screen.getByText("Edit Profile");
    fireEvent.click(editButton);

    expect(screen.getByText("Save Changes")).toBeInTheDocument();

    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
  });

  test("It logs out and navigates to login", () => {
    window.localStorage.setItem("token", "testToken");

    render(<ProfilePage />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
