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

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
      {posts.length === 0 ? ( // Check if there are no posts
        <>
          <Typography variant="body1" sx={{ color: "#A9B1D6" }}>
            No blog posts to show.
          </Typography>
        </>
      ) : (
        <>
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
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#E0E1DD" }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1.5, color: "#A9B1D6" }}
                >
                  {post.content.substring(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="small"
                  component={Link}
                  to={`/posts/${post._id}`}
                  sx={{ color: "#E0E1DD" }}
                >
                  Read more
                </Button>

                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1.5, color: "#A9B1D6" }}
                >
                  {`by ${post?.author?.username} on ${formattedDate(
                    post.createdAt
                  )}`}
                </Typography>
              </CardActions>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default PostList;
