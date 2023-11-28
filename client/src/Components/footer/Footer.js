import "./footer.css";

export default function Footer() {


   
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-3">

      <div className="container">
        <span className="text-muted">© {currentYear} GMC. All Right Reserved.</span>
      </div>
    </footer>
  );
}
