import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';
import FormularioEstudiante from './FormularioEstudiante';

function CursoModal({ curso, onClose }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editEstudiante, setEditEstudiante] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEstudiantes = useCallback(async () => {
    try {
      const res = await api.get(`/curso/cursos/${curso}/estudiantes`);
      setEstudiantes(res.data);
      setError('');
    } catch {
      setError('Error cargando estudiantes');
    } finally {
      setLoading(false);
    }
  }, [curso, setEstudiantes, setError, setLoading]);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  const handleCrear = () => {
    setEditEstudiante(null);
    setShowForm(true);
  };

  const handleEditar = (estudiante) => {
    setEditEstudiante(estudiante);
    setShowForm(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este estudiante?')) return;
    try {
      await api.delete(`/curso/cursos/${id}/estudiante/${id}`);
      fetchEstudiantes();
    } catch {
      alert('Error eliminando estudiante');
    }
  };

  const onFormCancel = () => {
    setShowForm(false);
    setEditEstudiante(null);
  };

  const onFormSuccess = () => {
    setShowForm(false);
    setEditEstudiante(null);
    fetchEstudiantes();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeBtn}>X</button>
        <h2>{curso.nombreCurso}</h2>
        <p><b>Docente:</b> {curso.nombreDocente}</p>
        <p><b>Duración:</b> {curso.duracionHoras} horas</p>
        <p>{curso.descripcion}</p>

        <hr />

        <h3>Estudiantes</h3>
        {loading ? <p>Cargando...</p> : error ? <p style={{color: 'red'}}>{error}</p> : (
          <>
            <button onClick={handleCrear} style={{marginBottom: 10}}>Agregar Estudiante</button>
            {estudiantes.length === 0 && <p>No hay estudiantes.</p>}
            <ul>
              {estudiantes.map(e => (
                <li key={e._id} style={{marginBottom: 8}}>
                  {e.nombre} - {e.email}
                  <button onClick={() => handleEditar(e)} style={{marginLeft: 10}}>Editar</button>
                  <button onClick={() => handleEliminar(e._id)} style={{marginLeft: 5}}>Eliminar</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {showForm && (
          <FormularioEstudiante
            cursoId={curso._id}
            estudiante={editEstudiante}
            onCancel={onFormCancel}
            onSuccess={onFormSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default CursoModal;

const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxWidth: 600,
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    border: 'none',
    background: 'transparent',
    fontSize: 18,
    cursor: 'pointer',
  }
};
