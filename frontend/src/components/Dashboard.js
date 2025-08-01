import React from 'react';
import Navbar from './Navbar';

function Dashboard() {
  const handleLogout = () => {
    // Puedes limpiar estado global o usar context
    console.log('Cierre de sesión');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>Bienvenido al panel</h1>
      {/* Contenido de la vista */}
    </div>
  );
}

export default Dashboard;
