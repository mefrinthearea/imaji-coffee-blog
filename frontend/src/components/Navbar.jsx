import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      backgroundColor: '#8B7355',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        IMAJI Coffee Blog
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
