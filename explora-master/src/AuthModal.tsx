import { useState } from "react";
import "./AuthModal.css";


export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />

        <button>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{cursor:"pointer"}}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
