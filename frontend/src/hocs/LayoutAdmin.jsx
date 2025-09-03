import '../assets/styles/MyNavbar.css'
import MyNavbar from '../components/navigation/MyNavbar'

function Layout({ children }) {
    return (
        <div id="layoutAdmin">
                    <MyNavbar style={{backgroundColour:'#214c72ff'}} type='admin' ></MyNavbar>
                    <div id="content" >
                        {children}
                    </div>
                </div>
    );

}

export default Layout;