import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(2, "User must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      await api.post("/register", values);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setErrors({ password: "Registration failed. Please try again." });
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
          Register
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
                  label="Username"
                  name="username"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
                {loading || isSubmitting ? "Registering..." : "Register"}
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, backgroundColor: "#1B263B" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Register;
