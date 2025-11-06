import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { doAdminSignUp } from "../services/adminservice";
import { useNavigate } from "react-router-dom";
import "./AddAdmin.css";

export function AddAdmin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(25, "Too Long!")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(25, "Too Long!")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required").max(16, "Password must not exceed 16 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });

  const handleSubmit = async (values,{resetform}) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await doAdminSignUp(values);
      setSuccess("Admin registered successfully!");
      setTimeout(() => navigate("/showadmins"), 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <Card className="shadow-lg border-0 rounded-4 p-4 admin-signup-card">
              <Card.Title className="text-center mb-3 fw-bold fs-3 text-primary">
                Admin Signup
              </Card.Title>

              {serverError && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setServerError(null)}
                >
                  {serverError}
                </Alert>
              )}
              {success && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSuccess(null)}
                >
                  {success}
                </Alert>
              )}

             
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ touched, errors }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">First Name</label>
                      <Field
                        name="first_name"
                        type="text"
                        className={`form-control ${
                          touched.first_name && errors.first_name ? "is-invalid" : ""
                        }`}
                        placeholder="Enter first name"
                      />
                      <ErrorMessage
                        component="div"
                        name="first_name"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Last Name</label>
                      <Field
                        name="last_name"
                        type="text"
                        className={`form-control ${
                          touched.last_name && errors.last_name ? "is-invalid" : ""
                        }`}
                        placeholder="Enter last name"
                      />
                      <ErrorMessage
                        component="div"
                        name="last_name"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${
                          touched.password && errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="d-grid mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-pill"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Signing Up...
                          </>
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
