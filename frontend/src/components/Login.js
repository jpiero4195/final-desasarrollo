import React, { useState } from 'react';
import api from '../api';

function Login({ onLogin }) {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={email}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
