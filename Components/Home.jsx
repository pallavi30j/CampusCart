import React, { useEffect, useState } from 'react';
import axios from 'axios';

const categories = ['All', 'Books', 'Electronics', 'Cycles', 'Furniture', 'Clothes', 'Other'];

function Home({ user }) {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState({});

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/listings');
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!search) return fetchListings();
    try {
      const res = await axios.get(`http://localhost:8080/api/listings/search?keyword=${search}`);
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategory = async (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      fetchListings();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/listings/category/${cat}`);
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/listings/${id}/view`);
      setViews(prev => ({ ...prev, [id]: res.data.views }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f0f4f0', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input
          type="text" placeholder="Search listings..."
          value={search} onChange={e => setSearch(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
        />
        <button onClick={handleSearch} style={{
          padding: '12px 24px', background: '#2d6a4f',
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
        }}>Search</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleCategory(cat)} style={{
            padding: '8px 16px', borderRadius: '99px',
            border: 'none', cursor: 'pointer',
            background: category === cat ? '#2d6a4f' : 'white',
            color: category === cat ? 'white' : '#333',
            fontWeight: category === cat ? 'bold' : 'normal'
          }}>{cat}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading listings...</p>
      ) : listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
          <p style={{ fontSize: '48px' }}>📦</p>
          <p style={{ fontSize: '18px', marginTop: '16px' }}>No listings yet!</p>
          <p>Be the first to sell something on CampusCart</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {listings.map(listing => (
            <div key={listing.id} style={{
              background: 'white', borderRadius: '12px',
              padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                background: '#e8f5e9', borderRadius: '8px',
                height: '140px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '12px', fontSize: '48px'
              }}>
                {listing.category === 'Books' ? '📚' :
                 listing.category === 'Electronics' ? '💻' :
                 listing.category === 'Cycles' ? '🚲' :
                 listing.category === 'Furniture' ? '🪑' :
                 listing.category === 'Clothes' ? '👕' : '📦'}
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px', color: '#1a1a1a' }}>{listing.title}</h3>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#666' }}>{listing.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d6a4f' }}>₹{listing.price}</span>
                <span style={{ fontSize: '11px', background: '#e8f5e9', color: '#2d6a4f', padding: '3px 8px', borderRadius: '99px' }}>{listing.condition}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>👁 {views[listing.id] || 0} views</span>
                <button onClick={() => handleView(listing.id)} style={{
                  padding: '8px 16px', background: '#2d6a4f',
                  color: 'white', border: 'none', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '13px'
                }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;