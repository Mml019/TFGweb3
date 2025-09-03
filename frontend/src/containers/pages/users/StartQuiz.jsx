import UseNavigation from '../../../assets/utils/functions/UseNavigation'
import LayoutUser from '../../../hocs/LayoutUser'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import logoPortada from '../../../assets/img/logo'
import { useState } from 'react'



export default function StartQuiz() {
    // create ana array with the number of check box
    const [checked,setIsChecked] = useState(new Array(2).fill(false))
    



    function handleClick() {
        // First checked if al checkbuttons and cookies are accepted.
        
        // Then show it userform 
        <UseNavigation destino='userForm/' />
    }






    return (
        <LayoutUser>
            <h1>StartQuiz</h1>
            <span>Inicio</span>
            <Row>
                <Col />
                <Col xs={10}>
                    <Image id='logo' src={logoPortada} alt='LogoUniversidad' />
                </Col>
                <Col />
            </Row>
            <Row>





                <Stack direction="horizontal" gap={2} className="col-md-8 mx-auto">
                    
                    
                </Stack>
                <Button href={handleClick} variant="primary">Empezar Test</Button>

            </Row>

            <div>Hola1</div>
            <div>Hola2</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>
            <div>Hola</div>

        </LayoutUser>
    )
}
