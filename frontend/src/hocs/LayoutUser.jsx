import '../assets/styles/MyNavbar.css'
import MyNavbar from '../components/navigation/MyNavbar'
import Container from 'react-bootstrap/Container';


function Layout({ children }) {
    const items = [
        { value: 'Usuarios', path: 'usuarios/' },
        { value: 'Formularios', path: 'formularios/' },
        { value: 'Resultados', path: 'resultados/' }
    ]
    return (

        <div id="layoutUser">
            <Container fluid>
                {children}
            </Container>
        </div>
    );
}

export default Layout;