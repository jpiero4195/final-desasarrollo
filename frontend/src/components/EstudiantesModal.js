import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import FormularioEstudiante from './FormularioEstudiante.js';

function EstudiantesModal({ cursoId, onClose }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [modoFormulario, setModoFormulario] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEstudiantes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/curso/cursos/${cursoId}/estudiantes`);
      setEstudiantes(res.data);
      setError('');
    } catch {
      setError('Error cargando estudiantes');
    } finally {
      setLoading(false);
    }
  }, [cursoId]);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  const eliminarEstudiante = async (id) => {
    if (!window.confirm('¿Eliminar estudiante?')) return;
    try {
      await api.delete(`/estudiante/eliminar/${id}`);
      fetchEstudiantes();
    } catch (err) {
      alert('Error al eliminar estudiante');
    }
  };

  const cerrarFormulario = () => {
    setEstudianteSeleccionado(null);
    setModoFormulario(null);
  };

  const actualizarLista = () => {
    cerrarFormulario();
    fetchEstudiantes();
  };

  return (
    <div style={modalStyle}>
      <h3>Estudiantes del Curso</h3>

      {loading && <p>Cargando estudiantes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {modoFormulario ? (
        <FormularioEstudiante
          cursoId={cursoId}
          estudiante={modoFormulario === 'editar' ? estudianteSeleccionado : null}
          onCancel={cerrarFormulario}
          onSuccess={actualizarLista}
        />
      ) : (
        <>
          <button onClick={() => setModoFormulario('crear')}>Agregar Estudiante</button>

          {estudiantes.length === 0 ? (
            <p>No hay estudiantes registrados.</p>
          ) : (
            <ul style={{ padding: 0 }}>
              {estudiantes.map(est => (
                <li key={est._id} style={itemStyle}>
                  <strong>{est.nombre}</strong> ({est.edad} años) - {est.email}
                  <div>
                    <button onClick={() => {
                      setEstudianteSeleccionado(est);
                      setModoFormulario('editar');
                    }}>Editar</button>
                    <button onClick={() => eliminarEstudiante(est._id)} style={{ marginLeft: 10 }}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button onClick={onClose} style={{ marginTop: 10 }}>Cerrar</button>
        </>
      )}
    </div>
  );
}

export default EstudiantesModal;

const modalStyle = {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  maxWidth: 600,
  margin: '40px auto',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
};

const itemStyle = {
  marginBottom: 10,
  padding: 10,
  border: '1px solid #ddd',
  borderRadius: 6
};
