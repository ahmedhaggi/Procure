import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../layout.css';

function NavBar() {
  // Get user information from Redux state
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const [showBasic, setShowBasic] = useState(false);
  const [showNavRight, setShowNavRight] = useState(false);
  const navigate = useNavigate();

  return (
    <MDBNavbar expand="lg" className="sticky-top bg-lime" light>
      <MDBContainer fluid>
        <MDBNavbarBrand style={{ fontSize: '25px' }} className="pt-2 navbar-brand h1 fw-bold">
          <span className="text-black">Procurement</span>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBCollapse navbar show={showNavRight}>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  {!token && (
                    <MDBBtn
                      size="lg"
                      outline
                      className="mx-2 text-black"
                      style={{ fontSize: '12px', letterSpacing: '2px' }}
                      color="danger"
                    >
                      Login
                    </MDBBtn>
                  )}
                </MDBNavbarLink>
                <MDBNavbarLink href="/">
                  {token && (
                    <MDBBtn
                      size="lg"
                      outline
                      className="mx-2 text-black"
                      style={{ fontSize: '12px', letterSpacing: '2px' }}
                      color="danger"
                      onClick={() => localStorage.clear()}
                    >
                      Logout
                    </MDBBtn>
                  )}
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/register">
                  {!token && (
                    <MDBBtn size="lg" className="mx-2" color="danger" style={{ fontSize: '12px', letterSpacing: '2px' }}>
                      Registration
                    </MDBBtn>
                  )}
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink tabIndex={-1} aria-disabled="true" style={{ color: 'black', cursor: 'pointer', margin: 20 }}>
                  <span style={{ color: 'black' }}>&nbsp;{user?.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
