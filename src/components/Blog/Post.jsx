import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    await api.delete(`/posts/${id}`);
    navigate("/");
  };

  console.log("post", post);
  console.log("user", user);
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post?.author?.username}</p>
      {user && user?.userId === post?.author?._id && (
        <div>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;
