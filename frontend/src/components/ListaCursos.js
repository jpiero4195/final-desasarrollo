import React, { useEffect, useState } from 'react';
import api from '../api';
import CursoModal from './CursoModal';

function ListaCursos() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarCursos = () => {
    api.get('/curso/cursos')
      .then(res => setCursos(res.data))
      .catch(() => alert('Error al cargar cursos'));
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const abrirModal = (curso) => {
    setCursoSeleccionado(curso);
    setMostrarModal(true);
  };

  return (
    <div style={{ maxWidth: 700, margin: '20px auto' }}>
      <h2>Cursos</h2>
      <ul>
        {cursos.map(curso => (
          <li key={curso._id} style={{ marginBottom: 10 }}>
            <strong>{curso.nombreCurso}</strong> - {curso.nombreDocente}
            <button onClick={() => abrirModal(curso)} style={{ marginLeft: 10 }}>
              Ver / Editar
            </button>
          </li>
        ))}
      </ul>

      {mostrarModal && (
        <CursoModal
          curso={cursoSeleccionado}
          onClose={() => setMostrarModal(false)}
          onRecargar={cargarCursos}
        />
      )}
    </div>
  );
}

export default ListaCursos;
