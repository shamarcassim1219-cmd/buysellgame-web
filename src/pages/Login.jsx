import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.login(email, password);
      navigate('/verify', { state: { email, purpose: 'login' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24 }}>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 13, color: 'var(--hint)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Sign up</Link>
      </p>
    </div>
  );
}
