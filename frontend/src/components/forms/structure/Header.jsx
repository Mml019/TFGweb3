import Container from "react-bootstrap/Container"
import Breadcrumb from "../../Breadcrumb"
import { useLocation } from "react-router-dom"

export default function Header({children}){
    const location = useLocation()

        const pathnames = location.pathname.split('/')
        //const pathnames = location.pathname.split('/').filter((x) => x);

    const items = (pathnames) =>(
         
        items = []
        for (i in pathnames){
            item = {link:`/${i}`, label:{i.capitalize()}}
            if i == pathnames.length:

            items.append(item)
        }
    )

    return(
        <div id="header">
            {children[0]}
            <Breadcrumb routes={children[1]}></Breadcrumb>
        </div>
    )
}