import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>MYGame Marketplace</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/wallet">Wallet</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/settings">Settings</Link>
          {isLoggedIn ? (
            <button onClick={logout} className="btn-outline">Logout</button>
          ) : (
            <Link to="/login"><button className="btn-primary">Login</button></Link>
          )}
        </div>
      </div>
      <p style={{ color: 'var(--hint)' }}>Buy & Sell Game Accounts Safely</p>
      <div style={{ marginTop: 20 }}>
        <p style={{ color: 'var(--hint)', fontSize: 13 }}>Listings will appear here.</p>
      </div>
    </div>
  );
}
