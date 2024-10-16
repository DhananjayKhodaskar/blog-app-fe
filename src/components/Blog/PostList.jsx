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
  Pagination,
} from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage] = useState(3);
  const [hasNextPage, setHasNextPage] = useState(false);

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
        const response = await api.get("/posts", {
          params: { page: currentPage, limit: postsPerPage },
        });
        setPosts(response.data.posts);
        setTotalPosts(response.data.totalPosts);
        setHasNextPage(response.data.hasNextPage);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {posts.length === 0 ? (
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
          <Box
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              mb: 2,
            }}
          >
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
          </Box>
          {/* Fixed position Pagination Component */}
          <Pagination
            count={Math.ceil(totalPosts / postsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              bottom: 0,
              backgroundColor: "#415977",
              zIndex: 1,
              "& .MuiPaginationItem-root:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            hideNextButton={
              !hasNextPage &&
              currentPage >= Math.ceil(totalPosts / postsPerPage)
            }
            hidePrevButton={currentPage === 1}
          />
        </>
      )}
    </Box>
  );
};

export default PostList;
