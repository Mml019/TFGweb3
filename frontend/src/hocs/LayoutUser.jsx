import MyNavbar from '../components/navigation/MyNavbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




function Layout({ children }) {

    const items = [
        { value: 'Usuarios', path: 'usuarios/' },
        { value: 'Formularios', path: 'formularios/' },
        { value: 'Resultados', path: 'resultados/' }
    ]
    return (
        <>
            <MyNavbar items={items}></MyNavbar>
            <div className='main'>
                {children}
            </div>
            <div className='footer'></div>
        </>
    );

}

export default Layout;