import React from "react";
import { Container, Card } from "@mui/material";
import Post from "../components/Blog/Post";

const SinglePost = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#778DA9",
        padding: 3,
        color: "white",
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: "80%",
          backgroundColor: "#415A77",
          color: "white",
          textAlign: "center",
        }}
      >
        <Post />
      </Card>
    </Container>
  );
};

export default SinglePost;
