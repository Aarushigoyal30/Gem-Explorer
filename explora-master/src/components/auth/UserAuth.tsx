import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { User } from 'firebase/auth';
import './UserAuth.css';

interface UserAuthProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ user, onSignIn, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
// ========================
// IF USER IS LOGGED IN
// ========================
if (user) {
  return (
    <div className="user-profile" ref={dropdownRef}>
      <button
        className="user-profile-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={user.photoURL || '/default-avatar.png'}
          alt={user.displayName || 'User'}
          className="user-avatar"
        />
        <span className="user-name">
          {user.displayName || 'User'}
        </span>
        <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>
          ▼
        </span>
      </button>

      {showDropdown && (
        <div className="user-dropdown improved">
          {/* Profile Info */}
          <div className="dropdown-header">
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt="profile"
              className="dropdown-avatar"
            />
            <div>
              <p className="dropdown-username">
                {user.displayName || 'User'}
              </p>
              <p className="dropdown-email">{user.email}</p>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          {/* Links */}
          <Link
            to="/settings"
            className="dropdown-item"
            onClick={() => setShowDropdown(false)}
          >
            ⚙️ Settings
          </Link>

          <Link
            to="/dashboard"
            className="dropdown-item"
            onClick={() => setShowDropdown(false)}
          >
            📊 Dashboard
          </Link>

          <div className="dropdown-divider"></div>

          {/* Sign Out */}
          <button
            className="dropdown-item sign-out-item"
            onClick={() => {
              onSignOut();
              setShowDropdown(false);
            }}
          >
            👋 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
  // ========================
  // IF USER IS NOT LOGGED IN
  // ========================
  return (
    <>
      <div className="auth-container">
        <button
          className="sign-in-btn"
          onClick={() => setShowModal(true)}
        >
          🔑 Login / Sign Up
        </button>
      </div>

      {showModal && (
        <div className="auth-overlay">
          <div className="auth-box">
            <h2>Welcome to Explora ✨</h2>
            <p>Sign in to save trips and manage favorites</p>

            <button
              className="google-login-btn"
              onClick={() => {
                onSignIn();
                setShowModal(false);
              }}
            >
              Continue with Google
            </button>

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAuth;
