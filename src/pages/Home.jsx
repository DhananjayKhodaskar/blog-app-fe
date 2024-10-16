import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import PostList from "../components/Blog/PostList";

const Home = () => {
  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#778DA9",
        color: "white",
        padding: 3,
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
        <Typography variant="h3" gutterBottom>
          Welcome to the Blog
        </Typography>
        <PostList />
      </Card>
    </Container>
  );
};

export default Home;
