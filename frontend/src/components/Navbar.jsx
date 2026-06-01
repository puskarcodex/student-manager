import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__icon">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-10 10S1 18.523 1 13c0-.538.046-1.064.134-1.577L12 14z" />
          </svg>
        </div>
        <h1 className="navbar__title">Student Manager</h1>
      </div>

      <div className="navbar__links">
        <Link to="/dashboard" className="navbar__link">Dashboard</Link>
        <Link to="/login" className="navbar__link">Login</Link>
        <button onClick={logout} className="navbar__logout">Logout</button>
      </div>
    </nav>
  );
}