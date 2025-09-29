import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardHeaderAndFooter() {
    // request data from question
    const questions = await();

    return (
        <Card className="text-center"
            bg='green'
            key={questions.idP}
            text={questions.statement}
            style={{ width: '18rem' }}
            border='green'
        >

            <Card.Header as="h1">Pregunta {}</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}


