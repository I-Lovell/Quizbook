import { useState } from "react";
import { createPost } from '../../services/posts'; // Adjust the path if necessary
import "./CreatePost.css";

const CreatePost = ({ content, setContent }) => {
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleQuestionChange = (event) => {
    const question = event.target.value;
    setContent((prevContent) => ({ ...prevContent, question }));
  };

  const handleAnswerChange = (event) => {
    const answer = event.target.value;
    setContent((prevContent) => ({ ...prevContent, answer }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to create a post.");
      return;
    }

    if (!content.question || !content.answer) {
      setErrorMessage("Both question and answer fields must be filled.");
      return;
    }

    try {
      await createPost(token, content.question, content.answer);
      console.log("Post created successfully");
      setContent({ question: '', answer: '' });
      setErrorMessage(""); // Clear error message on success
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err);
      setErrorMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <input 
        id="question"
        type="text"
        value={content.question || ''}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
        className="create-post-input"
      />
      <input
        id="answer"
        type="text"
        value={content.answer || ''}
        onChange={handleAnswerChange}
        placeholder="Enter your answer"
        className="create-post-input"
      />
      <button role="submit-button" id="submit" type="submit" className="create-post-button">
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
