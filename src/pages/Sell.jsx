import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sell() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Sell Your Account</h2>
      <p style={{ color: 'var(--hint)', marginTop: 8 }}>Listing form coming soon.</p>
    </div>
  );
}
