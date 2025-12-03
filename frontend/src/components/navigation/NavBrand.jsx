import Navbar from 'react-bootstrap/Navbar';

export default function NavBrand({ nameBrand, srcImg, width, height, alt }) {
    return (  
            <Navbar.Brand href="#" style={{color: 'white', alignItems: 'center', }} className="text-truncate">
                <img id='imageBrand'
                    alt={alt}
                    src={srcImg}
                    width={width}
                    height={height}
                    className="d-inline-block align-top"
                />{' '}
                {nameBrand}
            </Navbar.Brand>
     )
}