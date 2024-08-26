"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";

const Register = () => {
  const { register: registerUser, isLoggedIn } = useAuth(); // Destructure register function from useAuth
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data); // Use the register function from useAuth
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      reset(); // Clear form after successful registration
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
      setSuccessMessage("");
    }
  };

  if (isLoggedIn) {
    router.push("/");
  } else
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={4}>
            <h2 className="text-center mb-4">Register</h2>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};

export default Register;
