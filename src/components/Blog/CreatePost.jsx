import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
} from "@mui/material";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      await api.post("/posts", values);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setErrors({ content: "Failed to create post. Please try again." });
    } finally {
      setLoading(false);
      setSubmitting(false);
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
        <Typography variant="h4" gutterBottom>
          Create Post
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Title"
                  name="title"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Content"
                  name="content"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, backgroundColor: "#0D1B2A" }}
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? "Creating..." : "Create"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default CreatePost;
