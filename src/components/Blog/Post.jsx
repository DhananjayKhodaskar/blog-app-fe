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
  TextField,
  Box,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
      setComments(response.data.comments || []); // Set comments from the fetched post
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
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

  const handleToggleLike = async () => {
    try {
      const response = await api.post(`/posts/${id}/toggle-like`);
      if (response.status === 200) {
        fetchPost();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Prevent adding empty comments

    try {
      const response = await api.post(`/posts/${id}/comments`, {
        content: newComment,
      });
      if (response.status === 201) {
        setNewComment(""); // Clear the input field
        fetchPost(); // Refresh the post to show the new comment
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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

        {/* Display comments */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ color: "#A9B1D6" }}>
            Comments
          </Typography>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 1,
                  paddingLeft: 2,
                  display: "flex",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#A9B1D6", fontSize: 14 }}>
                  {comment.author?.username.toUpperCase()}:
                </Typography>
                <Typography variant="body2" sx={{ color: "#E0E1DD" }}>
                  {comment.content}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "#A9B1D6", fontSize: 14 }}>
              No comments yet.
            </Typography>
          )}
        </Box>

        {/* Add a new comment */}
        {user && (
          <Box sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ backgroundColor: "#E0E1DC", marginBottom: 1 }}
            />
            <Button
              onClick={handleAddComment}
              sx={{ backgroundColor: "#E0E1DC", color: "#0D1B2A" }}
              disabled={!newComment.trim()}
            >
              Submit Comment
            </Button>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          onClick={handleToggleLike}
          sx={{ backgroundColor: "#E0E1DC", color: "#0D1B2A" }}
          disabled={!user}
          startIcon={
            post?.likes?.includes(user?.userId) ? (
              <ThumbUpAltIcon />
            ) : (
              <ThumbUpOffAltIcon />
            )
          }
        >
          {` ${post?.likes?.length || 0}`}
        </Button>
        {user && user?.userId === post?.author?._id && (
          <>
            <Button
              size="small"
              onClick={() => navigate(`/edit/${id}`)}
              sx={{ color: "#E0E1DD" }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={handleDelete}
              sx={{ color: "#E0E1DD" }}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
