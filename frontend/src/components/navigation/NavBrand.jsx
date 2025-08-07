import NavbarBrand from 'react-bootstrap/NavbarBrand'

export default function NavBrand({ nameBrand, srcImg, width, height, alt }) {
    return (
            
            <NavbarBrand style={{color: 'white', alignItems: 'center'}}>
                
                <img id='imageBrand'
                    alt={alt}
                    src={srcImg}
                    width={width}
                    height={height}
                    className='d-inline-block align-text-center'
                />{' '}
               
                <span >{nameBrand}</span>
            </NavbarBrand>
            
    )
}