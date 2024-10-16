import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, content });
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePost;
