import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", marginBottom: 3 }}
      >
        Blog Posts
      </Typography>
      {posts.map((post) => (
        <Card
          key={post._id}
          sx={{
            minWidth: 275,
            marginBottom: "16px",
            backgroundColor: "#0D1B2A",
            color: "white",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: "#E0E1DD" }}>
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: 1.5, color: "#A9B1D6" }}
            >
              {post.content.substring(0, 100)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              to={`/posts/${post._id}`}
              sx={{ color: "#E0E1DD" }}
            >
              Read more
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;
