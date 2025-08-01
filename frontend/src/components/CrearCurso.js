import React, { useState } from 'react';
import api from '../api';

function CrearCurso({ onCursoCreado }) {
  const [formData, setFormData] = useState({
    nombreCurso: '',
    descripcion: '',
    duracionHoras: '',
    nombreDocente: '',
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');

  const validar = () => {
    const errs = {};
    if (!formData.nombreCurso.trim()) errs.nombreCurso = 'El nombre del curso es obligatorio';
    if (!formData.descripcion.trim()) errs.descripcion = 'La descripción es obligatoria';
    if (!formData.duracionHoras || isNaN(formData.duracionHoras) || formData.duracionHoras <= 0)
      errs.duracionHoras = 'La duración debe ser un número mayor que cero';
    if (!formData.nombreDocente.trim()) errs.nombreDocente = 'El nombre del docente es obligatorio';
    return errs;
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ''});
    setMensaje('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await api.post('/curso/cursos', {
        ...formData,
        duracionHoras: Number(formData.duracionHoras)
      });
      setMensaje('Curso creado exitosamente');
      setFormData({ nombreCurso: '', descripcion: '', duracionHoras: '', nombreDocente: '' });
      onCursoCreado(); // avisar para recargar lista
    } catch (error) {
      setMensaje('Error al crear el curso '+ error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Crear Curso</h2>

      <label style={styles.label}>
        Nombre del Curso:
        <input
          type="text"
          name="nombreCurso"
          value={formData.nombreCurso}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.nombreCurso && <p style={styles.error}>{errors.nombreCurso}</p>}
      </label>

      <label style={styles.label}>
        Descripción:
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
          style={{...styles.input, resize: 'vertical'}}
        />
        {errors.descripcion && <p style={styles.error}>{errors.descripcion}</p>}
      </label>

      <label style={styles.label}>
        Duración (horas):
        <input
          type="number"
          name="duracionHoras"
          value={formData.duracionHoras}
          onChange={handleChange}
          style={styles.input}
          min="1"
        />
        {errors.duracionHoras && <p style={styles.error}>{errors.duracionHoras}</p>}
      </label>

      <label style={styles.label}>
        Nombre del Docente:
        <input
          type="text"
          name="nombreDocente"
          value={formData.nombreDocente}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.nombreDocente && <p style={styles.error}>{errors.nombreDocente}</p>}
      </label>

      <button type="submit" style={styles.button}>Crear Curso</button>

      {mensaje && <p style={mensaje.includes('exitosamente') ? styles.success : styles.error}>{mensaje}</p>}
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 400,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
  },
  label: {
    display: 'block',
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#0077cc',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  error: {
    marginTop: 5,
    color: 'red',
    fontSize: 14,
  },
  success: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default CrearCurso;
