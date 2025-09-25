import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav'

import { Link } from 'react-router-dom';

import NavBrand from './NavBrand';


export default function MyNavbar({ style = { backgroundColor: '#0065BD', height:'55px' }, type = 'user', items = [] }) {

    return (
        <Navbar collapseOnSelect expand='lg' style={style} >
            <Container fluid>
                <NavBrand nameBrand='QuizPEB' srcImg='/img/logoUibConFondo.png' width='100px' height='40px' alt='Logo de la Universidad' />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Container fluid>
                        <Nav as='ul' className="me-auto my-2 my-lg-0" navbarScroll>
                            {items.length > 0 ?
                                (items.map((item, index) => (
                                    <NavItem as='li' key={index}>
                                        <Nav.Link as={Link} to={item.path} >
                                            {item.value}
                                        </Nav.Link>
                                    </NavItem>
                                )))
                                : null
                            }
                            {type == 'admin' ?
                                <Navbar.Text className='justify-content-end'>
                                    Eres Admin
                                </Navbar.Text>
                                : null}
                        </Nav>
                    </Container>
                </Navbar.Collapse>

            </Container>
        </Navbar >
    );

}
