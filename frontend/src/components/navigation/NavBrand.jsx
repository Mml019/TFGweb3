import Container from 'react-bootstrap/esm/Container'
import NavbarBrand from 'react-bootstrap/NavbarBrand'

export default function NavBrand({ nameBrand, srcImg, width, height, alt }) {
    return (
            <NavbarBrand href='#'>
                <img id='imageBrand'
                    alt={alt}
                    src={srcImg}
                    width={width}
                    height={height}
                    className='d-inline-block align-text-top'
                />
                {nameBrand}
            </NavbarBrand>
    )
}