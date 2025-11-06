import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal } from "react-bootstrap";
import { motion, scale } from "framer-motion";
import "./ShowAdmins.css";
import { deleteAdmin, getAdmins } from "../services/adminservice";
import { Trash3 } from "react-bootstrap-icons";
import { Navigate, useNavigate } from "react-router-dom";

export function ShowAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showmodal,setShowModal]=useState(false);
  const [selectedadmin,setSelectedAdmin]=useState(null);
  const loggedinemail=localStorage.getItem("loggedinemail");
  const navigate=useNavigate();


  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  useEffect(() => {
    const fetchadmins= async()=>{
        try{
            const admins=await getAdmins();
            setAdmins(admins.data);
            }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        };
    };
    fetchadmins();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading admins...</p>
      </Container>
    );
  }

  const handledelete=(admin)=>{
    setSelectedAdmin(admin);
    setShowModal(true);
  }


  const confirmDelete=async ()=>{
    try{
      const resp=await deleteAdmin(selectedadmin.email);
      setAdmins(admins.filter(a=>a._id!==selectedadmin._id));
    }
    catch(error){
      console.log(error.message);
    }
    finally{
      setShowModal(false);
    }
  }


  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <div
          className="d-flex justify-content-between align-items-center mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <div className="text-center flex-grow-1">
            <h1 className="fw-bold text-primary display-6 mb-0">
              Admin Management
            </h1>
            <p className="text-muted fs-6 mb-0">
              View and manage all registered administrators
            </p>
          </div>

          <Button
            variant="success"
            size="sm"
            className="ms-3 add-admin-btn"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigate("/addadmin")}
          >
            + Add Admin
          </Button>
        </div>
      </motion.div>

      <Row className="g-4">
        {admins.length === 0 ? (
          <p className="text-center text-muted">No admins found.</p>
        ) : (
          admins.filter(admin=>admin.email!==loggedinemail).map((admin, i) => (
            <Col key={admin._id || i} xs={12} md={6} lg={4}>
              <motion.div
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Card className="shadow-lg border-0 rounded-4 admin-list-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="fw-bold text-dark mb-1">
                          {admin.first_name} {admin.last_name}
                        </h5>
                        <p className="text-muted mb-0">{admin.email}</p>
                      </div>
                      <div>
                        <motion.div
                         initial={{scale:1} }
                         whileHover={{scale:1.2}}
                         transition={{duration:0.6}}>
                            <Trash3 className="trash px-1 mx-2"  style={{ fontSize: "30px",cursor:"pointer" }} onClick={()=>{handledelete(admin)}}/>
                        </motion.div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))
        )}
      </Row>
      <Modal show={showmodal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedadmin?.first_name} {selectedadmin?.last_name} As Admin</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
