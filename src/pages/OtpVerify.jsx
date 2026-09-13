import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function OtpVerify() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (purpose === 'register') {
        await api.verifyRegistration(email, code);
      } else {
        await api.verifyLogin(email, code);
      }
      login();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Enter Verification Code</h2>
      <p style={{ color: 'var(--hint)', fontSize: 13, marginBottom: 20 }}>
        We sent a code to {email || 'your email'}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          type="text"
          placeholder="6-digit code"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{ letterSpacing: 6, textAlign: 'center', fontSize: 20 }}
        />
        {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Verifying...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
}
