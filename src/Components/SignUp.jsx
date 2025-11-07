import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { doSignup } from "../services/userservices";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export function SignUp() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);

 
  const SignUpSchema = Yup.object().shape({
    first_name: Yup.string().min(2, "Too short!").required("First name is required"),
    last_name: Yup.string().min(2, "Too short!").required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    DOB: Yup.date()
      .max(new Date(), "DOB cannot be in the future")
      .required("Date of birth is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
        .max(16, "Password must not exceed 16 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });

  const togglepassword=()=>setShowPassword(!showPassword)

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await doSignup(values);
      setSuccess("Account created successfully!");
      resetForm();
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg border-0 rounded-4 p-4 signup-card">
              <Card.Title className="text-center mb-3 fw-bold fs-3 text-primary">
                User Signup
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
                  DOB: "",
                  password: "",
                }}
                validationSchema={SignUpSchema}
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
                      <label className="form-label fw-semibold">Date of Birth</label>
                      <Field
                        name="DOB"
                        type="date"
                        className={`form-control ${
                          touched.DOB && errors.DOB ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="DOB"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <Field
                        name="password"
                        type={showPassword?"text":"password"}
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
                      <Button variant="outline-secondary" onClick={togglepassword}>
                        {showPassword?<EyeSlash/>:<Eye/>}
                      </Button>
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

                    <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
                      <p className="mb-0">Already have an account?</p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate("/")}
                      >
                        Login
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
