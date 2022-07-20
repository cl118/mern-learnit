import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar className='shadow navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <div className='d-flex'>
          <Navbar.Brand className='font-weight-bolder text-white'>
            <img
              src={learnItLogo}
              alt='learnItLogo'
              width={32}
              height={32}
              className='me-2'
            />
            LearnIt
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' />
          <Nav>
            <Nav.Link
              className='font-weight-bolder text-white'
              to='/dashboard'
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className='font-weight-bolder text-white'
              to='/about'
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>
        </div>

        <div className='d-flex'>
          <Nav>
            <Nav.Link className='font-weight-bolder text-white' disabled>
              Welcome <strong>{username}</strong>
            </Nav.Link>
            <Button
              variant='secondary'
              className='font-weight-bolder text-white'
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt='logoutIcon'
                width={32}
                height={32}
                className='me-2'
              />
              Logout
            </Button>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarMenu;
