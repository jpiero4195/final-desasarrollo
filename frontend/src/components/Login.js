import React, { useState, useEffect } from 'react';
import api from '../api';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1470&q=80',
];

function Login({ onLogin }) {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImgIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Credenciales inválidas: ${err.response.data.message}`);
      } else if (err.message) {
        setError(`Error de red: ${err.message}`);
      } else {
        setError('Error desconocido al iniciar sesión');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.background,
          backgroundImage: `url(${images[currentImgIndex]})`,
          transition: 'background-image 1.5s ease-in-out',
        }}
      />
      <button style={{ ...styles.arrow, left: 20 }} onClick={prevImage} aria-label="Imagen anterior">
        ‹
      </button>
      <button style={{ ...styles.arrow, right: 20 }} onClick={nextImage} aria-label="Imagen siguiente">
        ›
      </button>
      <div style={styles.indicators}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => goToImage(i)}
            style={{
              ...styles.dot,
              backgroundColor: i === currentImgIndex ? '#0077cc' : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={email}
          onChange={e => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    fontFamily: 'Arial, sans-serif',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.5)',
    zIndex: 1,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: 'none',
    color: 'white',
    fontSize: '2.5rem',
    cursor: 'pointer',
    padding: '5px 15px',
    borderRadius: '50%',
    userSelect: 'none',
    zIndex: 3,
  },
  indicators: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 10,
    zIndex: 3,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  form: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px 40px',
    borderRadius: 8,
    width: 340,
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: 15,
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0077cc',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 16,
    marginTop: 5,
  },
};

export default Login;
