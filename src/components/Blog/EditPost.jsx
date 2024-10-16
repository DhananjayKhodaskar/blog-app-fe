import React, { useState, useEffect } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/posts/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPost;
