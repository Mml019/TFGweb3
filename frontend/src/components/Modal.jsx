import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyButton from './MyButton';

export default function MyVerticallyCenteredModal( props) {
  return (
    <Modal
      //{...props}
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      // aria-labelledby={props.children[0]}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.children[0]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children[1]}
      </Modal.Body>
      <Modal.Footer>
        
        {props.footerButtons && props.footerButtons.length > 0  
        ? 
        props.footerButtons.map((btn, index) => (
          <MyButton
            key={`btn-${index}`}
            label={btn.label}
            type={btn.type}
            variant={btn.variant}
            size={btn.size}
            onClick={btn.onClick}
          >{btn.label}</MyButton>
        ))
        :
        props.children[2]}
      </Modal.Footer>
    </Modal>
  );
}
