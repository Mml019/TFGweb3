import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav'

import { Link } from 'react-router-dom';

import NavBrand from './NavBrand';


export default function MyNavbar({ style = { backgroundColor: '#0065BD' }, type = 'user', items = [] }) {

    return (
            <Navbar expand='lg' style={style} fixed='top'>
                <Container fluid>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <NavBrand nameBrand='QuizPEB' srcImg='/img/logoUib.png' width='100' height='30' alt='Logo de la Universidad' />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto" as='ul'>
                               { console.log(items)}
                                {items.length > 0 ?
                                    (items.map((item, index) => (
                                        
                                        <NavItem as='li' key={index}>
                                            <Nav.Link as={Link} to='#'>
                                                adeu
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
                        </Navbar.Collapse>
                    </Navbar.Toggle> 
                </Container>
            </Navbar >
    )
}
