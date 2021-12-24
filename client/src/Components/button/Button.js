import "./button.css";

export default function Button({ color, clickHandler, label, radius, type = 'button' }) {
    return (
        <button type={type} className={`btn btn-${color} ${radius ? 'btn-radius' : ''}`} onClick={clickHandler}>{label}</button>
    )
}