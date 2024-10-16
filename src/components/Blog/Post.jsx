import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

  return (
    <Card sx={{ minWidth: 275, margin: "20px auto", maxWidth: 600 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Author: {post?.author?.username}
        </Typography>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Post Content
        </Typography>
        <Typography variant="body2">{post.content}</Typography>
      </CardContent>
      {user && user?.userId === post?.author?._id && (
        <CardActions>
          <Button size="small" onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </Button>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
