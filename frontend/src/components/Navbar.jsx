import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.menu}>
        <li><Link to="/dashboard" style={styles.link}>Inicio</Link></li>
        <li><Link to="/cursos" style={styles.link}>Cursos</Link></li>
        <li>
          <button onClick={onLogout} style={styles.logout}>Cerrar Sesión</button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    background: '#333',
    padding: '10px',
    marginBottom: '20px',
  },
  menu: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  logout: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default Navbar;
