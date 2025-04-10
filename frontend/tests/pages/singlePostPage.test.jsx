import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SinglePost } from "../../src/pages/SinglePost/SinglePost";
import { getSinglePostByID } from "../../src/services/posts";

const navigateMock = vi.fn();

vi.mock("../../src/services/posts", () => ({
  getSinglePostByID: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

describe("SinglePost Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
    navigateMock.mockReset();
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("It displays the post when loaded successfully", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPost = { username: "12345", question: "Test Post", answer: "Test Answer" };
    getSinglePostByID.mockResolvedValue({ post: mockPost, token: "newToken" });

    renderWithRouter(<SinglePost />);

    const username = await screen.findByText("Created by: 12345", { exact: false });
    const question = await screen.findByText("Question: Test Post", { exact: false });
    const answer = await screen.findByText("Answer: Test Answer", { exact: false });

    expect(username).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(answer).toBeInTheDocument();
  });

  test("It navigates to login if no token is present", () => {
    renderWithRouter(<SinglePost />);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("It navigates to feed if post is not found", async () => {
    window.localStorage.setItem("token", "testToken");

    getSinglePostByID.mockRejectedValue(new Error("Post not found"));

    renderWithRouter(<SinglePost />);
    await screen.findByText("Loading post..."); // Ensure the component renders before checking navigation
    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });
});
