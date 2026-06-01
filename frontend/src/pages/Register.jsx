import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    registerUser({ name, email, password })
      .then(() => {
        alert("Registered successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = () => {
    // Google OAuth logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo__icon">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-10 10S1 18.523 1 13c0-.538.046-1.064.134-1.577L12 14z"
              />
            </svg>
          </div>
          <span className="auth-logo__text">Student Manager</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-header__title">Create an account</h1>
          <p className="auth-header__subtitle">
            Get started with Student Manager today
          </p>
        </div>

        <button className="btn-google" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span className="auth-divider__line" />
          <span className="auth-divider__text">or continue with email</span>
          <span className="auth-divider__line" />
        </div>

        <div className="form__fields">
          <div className="form__field">
            <label>Full Name</label>
            <input
              className="form__input"
              placeholder="Jane Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__field">
            <label>Email</label>
            <input
              className="form__input"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__field">
            <label>Password</label>
            <input
              className="form__input"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn--primary btn--full" onClick={handleRegister}>
          Create account
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span
            className="auth-footer__link"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
