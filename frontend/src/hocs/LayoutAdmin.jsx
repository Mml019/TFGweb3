import '../assets/styles/MyNavbar.css'
import MyNavbar from '../components/navigation/MyNavbar'

function Layout({ children }) {
    const items = [
        { value: 'Usuarios', path: 'usuarios/' },
        { value: 'Formularios', path: 'formularios/' },
        { value: 'Resultados', path: 'resultados/' }]
    return (
        <div id="layoutAdmin">
            <MyNavbar style={{ backgroundColour: '#214c72ff' }} type='admin' ></MyNavbar>
            <div id="content" >
                {children}
            </div>
        </div>
    );

}

export default Layout;