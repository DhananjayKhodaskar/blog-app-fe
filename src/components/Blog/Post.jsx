import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "20px auto",
        maxWidth: 600,
        backgroundColor: "#0D1B2A",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "#A9B1D6", fontSize: 14 }}>
          Author: {post?.author?.username}
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: "#E0E1DD" }}>
          {post.title}
        </Typography>
        <Typography sx={{ color: "#A9B1D6", marginBottom: 1.5 }}>
          Post Content
        </Typography>
        <Typography variant="body2" sx={{ color: "#E0E1DD" }}>
          {post.content}
        </Typography>
      </CardContent>
      {user && user?.userId === post?.author?._id && (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={() => navigate(`/edit/${id}`)}
            sx={{ color: "#E0E1DD" }}
          >
            Edit
          </Button>
          <Button size="small" onClick={handleDelete} sx={{ color: "#E0E1DD" }}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
