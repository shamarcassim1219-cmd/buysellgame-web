import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Wallet() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    api.getWalletBalance()
      .then((data) => setBalance(data.walletBalance))
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Wallet</h2>
      {loading ? (
        <p style={{ color: 'var(--hint)' }}>Loading...</p>
      ) : (
        <p style={{ fontSize: 28, fontWeight: 700, marginTop: 12 }}>LKR {balance?.toFixed(2)}</p>
      )}
    </div>
  );
}
