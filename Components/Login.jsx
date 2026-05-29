import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f4f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '40px', width: '100%', maxWidth: '380px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2d6a4f', marginBottom: '8px' }}>🛒 CampusCart</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>Buy & Sell within Jain University</p>

        {error && <div style={{ background: '#fee', color: '#c00', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '14px' }} />

        <input type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '20px', fontSize: '14px' }} />

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '12px', background: '#2d6a4f',
          color: 'white', border: 'none', borderRadius: '6px',
          cursor: 'pointer', fontSize: '15px', fontWeight: 'bold'
        }}>{loading ? 'Logging in...' : 'Login'}</button>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} style={{ color: '#2d6a4f', cursor: 'pointer', fontWeight: 'bold' }}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;