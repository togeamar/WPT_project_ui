import { useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { analyse } from "../services/analyservice.js";

export function Landing() {
  const navigate=useNavigate();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const loggedinuser=localStorage.getItem("loggedinuser");

  const handleFile = (selected) => {
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError(null);
    } else {
      setError("Please upload a PDF file only.");
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("pdffile", file);

    try {
      const res = await analyse(formData);
      setSuccess("Uploaded & analyzed successfully!");
      navigate("/analysis", { state: { analysis: res.data } });
      console.log(`this is analysis ${res.data}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">

      <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <div className="d-flex justify-content-between align-items-center mx-auto" style={{ maxWidth: "800px" }}>
              <div className="text-center flex-grow-1">
                <h1 className="fw-bold text-primary display-5 mb-0">Welcome</h1>
                <h1 className="fw-bold text-primary display-1 mb-0">Hello,{loggedinuser}</h1>
                <p className="text-muted fs-5 mb-0">
                  Get Your resume analysis scores
                </p>
              </div>
            </div>
    
        </motion.div>


      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="resume-card shadow-lg border-0 rounded-4 p-3">
              <Card.Title className="text-center mb-3 fw-bold fs-3">
                Upload Your Resume
              </Card.Title>

              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError(null)}
                >
                  {error}
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

              <motion.div
                className={`dropzone ${dragActive ? "drag-active" : ""}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {file ? (
                  <p className="text-success fw-semibold">{file.name}</p>
                ) : (
                  <p className="text-muted">Drag and drop PDF here or click to choose</p>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  className="file-input"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </motion.div>

              <div className="d-grid mt-3">
                <Button
                  variant="primary"
                  className="rounded-pill"
                  onClick={uploadFile}
                  disabled={loading || !file}
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
                      Uploading...This may take 30 sec
                    </>
                  ) : (
                    "Upload & Analyze"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
