import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#2d6a4f', padding: '12px 24px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', color: 'white'
    }}>
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span style={{ fontSize: '22px', fontWeight: 'bold' }}>🛒 CampusCart</span>
        <span style={{ fontSize: '12px', marginLeft: '8px', opacity: 0.8 }}>Jain University</span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px' }}>Hi, {user.name}!</span>
        <button onClick={() => navigate('/create')} style={{
          padding: '8px 16px', background: '#52b788',
          color: 'white', border: 'none', borderRadius: '6px',
          cursor: 'pointer', fontWeight: 'bold'
        }}>+ Sell Item</button>
        <button onClick={() => setUser(null)} style={{
          padding: '8px 16px', background: 'transparent',
          color: 'white', border: '1px solid white',
          borderRadius: '6px', cursor: 'pointer'
        }}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;