import React, { useEffect, useState } from 'react';
import api from '../api';

function ListaCursos() {
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/curso/cursos')
      .then(res => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar cursos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (cursos.length === 0) return <p>No hay cursos disponibles.</p>;

  return (
    <><div style={styles.container}>
      <h2 style={styles.title}>Cursos Disponibles</h2>
      <ul style={styles.list}>
        {cursos.map(curso => (
          <li key={curso._id} style={styles.item}>
            <h3 style={styles.courseName}>{curso.nombreCurso}</h3>
            <p style={styles.teacher}>Docente: <strong>{curso.nombreDocente}</strong></p>
            <p style={styles.description}>{curso.descripcion}</p>
            <p style={styles.duration}>Duración: {curso.duracionHoras} horas</p>
          </li>
        ))}
      </ul>
    </div></>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '20px auto',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 6,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  courseName: {
    margin: 0,
    color: '#0077cc',
  },
  teacher: {
    margin: '5px 0',
    fontStyle: 'italic',
    color: '#555',
  },
  description: {
    margin: '8px 0',
    color: '#444',
  },
  duration: {
    margin: 0,
    fontWeight: 'bold',
    color: '#222',
  },
};

export default ListaCursos;
