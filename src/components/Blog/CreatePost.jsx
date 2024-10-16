import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Card } from "@mui/material";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/posts", { title, content });
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#778DA9",
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: "40vw",
          backgroundColor: "#415A77",
          color: "white",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Create Post
          </Typography>

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, backgroundColor: "#0D1B2A" }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default CreatePost;
