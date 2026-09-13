import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { isLoggedIn, profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Settings</h2>
      {profile && <p style={{ color: 'var(--hint)', marginTop: 8 }}>{profile.displayName || profile.email}</p>}
      <button onClick={handleLogout} className="btn-outline" style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
}
