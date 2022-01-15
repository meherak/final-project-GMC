import "./loader.css";

export default function Loader({ color }) {
  return (
    <div className="loading-container">
      <div className={`spinner-border text-${color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
