import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MyVerticallyCenteredModal( props) {
  let person = props.person
  let button = props.button

  return (
    <Modal
      //{...props}
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    // aria-labelledby={children[0]}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        {props.footerButtons.map((btn, index) => (
          <ModalButton
            key={`btn-${index}`}
            label={btn.label}
            type={btn.type}
            variant={btn.variant}
            size={btn.size}
            onClick={btn.onClick}
          />
        ))}

        {/* <ModalButton
          key="hola"
            label="2"
            type='button'
            variant="primary"
            size="sm"
        ></ModalButton> */}
      </Modal.Footer>
    </Modal>
  );
}

export function ModalButton( props ) {
  return (
    <Button {...props}>
      {props.label}
    </Button>
  );
}