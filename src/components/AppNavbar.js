import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
		  <Container>
		    <Navbar.Brand as={NavLink} to="/">FileHive</Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="me-auto">
		        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
		        <Nav.Link as={NavLink} to="/movies">Movies</Nav.Link>

		       {(user.id !== null) ? 
				user.isAdmin 
					?
					<>
						<Nav.Link as={NavLink} to="/addMovie">Add Movie</Nav.Link>
						<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
					:
					<>
						<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
				:
				<>
				    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
				    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
				</>
			}
		        
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}

