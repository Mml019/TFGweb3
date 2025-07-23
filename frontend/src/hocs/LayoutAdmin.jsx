import {MyNavbar} from '../components/navigation/MyNavbar'

function Layout({ children }) {
    const items = [
        { value: 'Usuarios', path: '/usuarios' },
        { value: 'Formularios', path: '/formularios' },
        { value: 'Resultados', path: '/resultados' }
    ]

    return (
        <div>
            <MyNavbar style={{backgroundColour:'#214c72ff'}} type='admin' items={items}></MyNavbar>
            {children}
        </div>
    );

}

export default Layout;