import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import ListaCursos from './components/ListaCursos';
import CrearCurso from './components/CrearCurso';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [reloadCursos, setReloadCursos] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const recargarCursos = () => {
    setReloadCursos(prev => !prev);
  };

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        {/* Mostrar navbar solo si está logueado */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}

        <Routes>
          {/* Ruta pública */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/cursos" /> : <Login onLogin={handleLogin} />}
          />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path="/cursos"
              element={
                <>
                  <CrearCurso onCursoCreado={recargarCursos} />
                  <ListaCursos key={reloadCursos} />
                </>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Ruta comodín */}
          <Route path="*" element={<Navigate to={isLoggedIn ? '/cursos' : '/login'} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
