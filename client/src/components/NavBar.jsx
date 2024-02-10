import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tab, Nav, Offcanvas, Button, Form, FormControl } from 'react-bootstrap';
import SignUpForm from './SignUp';
import LoginForm from './Login';
import { PiPlantThin, PiPottedPlantThin } from "react-icons/pi";
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <nav className="navbar fixed-top navB border-1 border-white rounded">
      <div className="container-fluid justify-content-center  ">
        <Link className="navbar-brand title" to="/">Green<PiPlantThin className="icon" style={{ fontsize: '4rem' }} /> Thumbs</Link>
        <Button className="navbar-toggler border border-2 border-white" type="button" onClick={() => setShowOffcanvas(true)} aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className=""><PiPottedPlantThin className="icon2" style={{ fontsize: '4rem' }} /></span>
        </Button>
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" className="offcanvas offcanvas-end">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <Button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setShowOffcanvas(false)}></Button>
          </div>
          <div className="offcanvas-body">
            <Nav className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/Blogs">Blogs</Link> 
              {/* Conditional rendering based on auth status */}
              {Auth.loggedIn() ? (
                <>
                  <Link className="nav-link" to="/SavedPlants">See Your Plants</Link>
                  <Link className="nav-link" onClick={Auth.logout} to="/">Logout</Link>
                </>
              ) : (
                <Link className="nav-link" to="#" onClick={() => setShowModal(true)}>Login/Sign Up</Link>
              )}
            </Nav>
            <Form className="d-flex mt-3" role="search">
              <FormControl type="search" placeholder="Search" aria-label="Search" className="me-2" />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </div>
        </Offcanvas>
      </div>

      {/* Modal for Login/SignUp */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal">
        {/* separated signup and login because signup was not popping up */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              Login/Sign Up
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav variant="pills" className="justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </nav>
  );
};

export default AppNavbar;

