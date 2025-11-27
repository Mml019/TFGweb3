import Button from 'react-bootstrap/Button';

export default function MyButton(props) {
    return (
        <Button {...props}>
            {props.children}
        </Button>
    );
}

export function Buttons({btns}) {
    btns.map((btn, index) => (
        <MyButton
            key={`btn-${index}`}
            label={btn.label}
            type={btn.type}
            variant={btn.variant}
            size={btn.size}
            onClick={btn.onClick}
            className={`btn ${btn.type}`}
        />
    ));
}