import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../services/tokenservice";


export function Navigationbar() {

    const navigate = useNavigate();
    const userType=localStorage.getItem("type");

    const handleLogout = ()=>{
        removeToken();
        localStorage.clear()
        navigate("/");
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Resume Analyser</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {userType === "admin" ? (
                            <>
                                <Nav.Link onClick={() => navigate("/admin")}>Dashboard</Nav.Link>
                                <Nav.Link onClick={() => navigate("/showadmins")}>Admins</Nav.Link>
                                <Nav.Link onClick={() => navigate("/addadmin")}>Add Admin</Nav.Link>
                            </>
                            ):<></>
                            }
                    </Nav>
                </Navbar.Collapse>
                <Button variant="success" onClick={handleLogout}>Logout</Button>
            </Container>
        </Navbar>
    )
}