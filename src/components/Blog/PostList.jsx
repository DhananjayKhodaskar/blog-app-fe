import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get("/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link to={`/posts/${post._id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
