import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post._id} sx={{ minWidth: 275, marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 1.5 }}
            >
              {post.content.substring(0, 100)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/posts/${post._id}`}>
              Read more
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;
