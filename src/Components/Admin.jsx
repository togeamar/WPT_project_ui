import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import "./Admin.css";
import { getScore } from "../services/adminservice";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const loggedinuser=localStorage.getItem("loggedinuser");
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  useEffect(() => {
    const fetchScores = async () => {
        try {
          const response = await getScore();
          console.log("✅ API Response:", response);
          setScores(response.data);
        } catch (error) {
          console.log(error);
          setError(error?.message || "Error fetching score");
        } finally {
          setLoading(false);
        }
      };

      fetchScores();
  }, []);


  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading recent scores...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h5 className="text-danger">{error}</h5>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <div className="d-flex justify-content-between align-items-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="text-center flex-grow-1">
            <h1 className="fw-bold text-primary display-5 mb-0">Admin Dashboard</h1>
            <h1 className="fw-bold text-primary display-1 mb-0">Hello,{loggedinuser}</h1>
            <p className="text-muted fs-5 mb-0">
              Review recent resume analysis scores submitted by users
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            className="ms-3"
            style={{ whiteSpace: "nowrap" }}
            onClick={()=>{navigate("/showadmins")}}
          >
            Show Admins
          </Button>
        </div>

      </motion.div>

      <Row className="g-4">
        {scores.length === 0 ? (
          <p className="text-center text-muted">No scores available.</p>
        ) : (
          scores.map((entry, i) => (
            <Col key={i} xs={12} md={6} lg={4}>
              <motion.div
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Card className="shadow-lg border-0 rounded-4 admin-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-bold text-dark mb-1">
                          {entry.usermodel?.first_name} {entry.usermodel?.last_name}
                        </h5>
                        <p className="text-muted mb-2">{entry.usermodel?.email}</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="score-bubble"
                      >
                        <span>{entry.score}</span>
                      </motion.div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))
        )}
      </Row>

      <div className="text-center mt-5">
        <Button
          variant="outline-primary"
          className="rounded-pill px-4"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    </Container>
  );
}
