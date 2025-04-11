import { render, screen } from "@testing-library/react";
import { CurrentUserProvider } from "../../src/contexts/CurrentUserContext";
import Post from "../../src/components/Post/Post";
import { BrowserRouter } from "react-router-dom";



const renderWithRouterAndProvider = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>, { wrapper: CurrentUserProvider });
};


describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { 
      username: "123", 
      Question: "test question",
      Answer: "test answer",
      UserID: "1"
    };
    renderWithRouterAndProvider(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("Created by: 123Question: Show AnswerLikes: LikeComments:Post Comment");
  });
});