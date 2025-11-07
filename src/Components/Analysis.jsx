import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Card, ProgressBar, Button } from "react-bootstrap";
import './Analysis.css'

export function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state?.analysis;

  const [expanded, setExpanded] = useState(null);

  if (!analysisData) {
    return (
      <Container className="text-center mt-5">
        <h4>No analysis data found.</h4>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Container>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1 className="fw-bold display-5 text-primary mb-3">Resume Analysis</h1>
        <h2 className="fw-bold text-dark">Overall Score</h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="d-inline-block bg-light shadow-lg p-4 rounded-4"
        >
          <h3 className="fw-bold text-dark">{analysisData.overall_score}/100</h3>
        </motion.div>
      </motion.div>

      <Row className="g-4">
        {analysisData.criteria.map((item, i) => (
          <Col key={i} xs={12}>
            <motion.div
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Card
                className="shadow-lg border-0 rounded-4 overflow-hidden"
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 text-secondary">
                      {item.criteria_name}
                    </h5>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="fs-5 fw-semibold text-primary"
                    >
                      {item.criteria_score}/10
                    </motion.span>
                  </div>

                  <ProgressBar
                    now={item.criteria_score * 10}
                    className="mt-3"
                    style={{ height: "6px", borderRadius: "3px" }}
                  />

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <p className="text-muted mb-0">{item.analysis}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Button variant="secondary" onClick={() => navigate("/landing")}>
          Upload Another Resume
        </Button>
      </div>
    </Container>
  );
}
