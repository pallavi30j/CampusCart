import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['Books', 'Electronics', 'Cycles', 'Furniture', 'Clothes', 'Other'];
const conditions = ['New', 'Like New', 'Good', 'Fair'];

function CreateListing({ user }) {
  const [form, setForm] = useState({
    title: '', description: '', price: '',
    category: 'Books', condition: 'Good', imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`http://localhost:8080/api/listings?userId=${user.userId}`, {
        ...form, price: parseFloat(form.price)
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create listing. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', background: '#f0f4f0', minHeight: '100vh' }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '32px', maxWidth: '500px', margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2d6a4f', marginBottom: '24px' }}>📦 Post a Listing</h2>

        {error && <div style={{ background: '#fee', color: '#c00', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px' }}>Title</label>
        <input type="text" placeholder="What are you selling?" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '14px' }} />

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px' }}>Description</label>
        <textarea placeholder="Describe your item..." value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={3}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '14px', resize: 'vertical' }} />

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px' }}>Price (₹)</label>
        <input type="number" placeholder="0" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '14px' }} />

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px' }}>Category</label>
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '16px', fontSize: '14px' }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px' }}>Condition</label>
        <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '24px', fontSize: '14px' }}>
          {conditions.map(c => <option key={c}>{c}</option>)}
        </select>

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px', background: '#2d6a4f',
          color: 'white', border: 'none', borderRadius: '8px',
          cursor: 'pointer', fontSize: '15px', fontWeight: 'bold'
        }}>{loading ? 'Posting...' : 'Post Listing'}</button>
      </div>
    </div>
  );
}

export default CreateListing;