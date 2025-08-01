import React, { useState, useEffect } from 'react';
import api from '../api';

function FormularioEstudiante({ cursoId, estudiante, onCancel, onSuccess }) {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    email: ''
  });

  useEffect(() => {
    if (estudiante) {
      setForm({
        nombre: estudiante.nombre || '',
        edad: estudiante.edad || '',
        email: estudiante.email || ''
      });
    }
  }, [estudiante]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (estudiante) {
        await api.put(`/estudiante/editar/${estudiante._id}`, form);
      } else {
        await api.post(`/estudiante/crear/${cursoId}`, form);
      }
      onSuccess();
    } catch (err) {
      alert('Error al guardar estudiante');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h4>{estudiante ? 'Editar' : 'Agregar'} Estudiante</h4>

      <div style={fieldStyle}>
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>

      <div style={fieldStyle}>
        <label>Edad:</label>
        <input type="number" name="edad" value={form.edad} onChange={handleChange} required />
      </div>

      <div style={fieldStyle}>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      <button type="submit" style={{ marginRight: 10 }}>
        {estudiante ? 'Actualizar' : 'Crear'}
      </button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default FormularioEstudiante;

const formStyle = {
  padding: 20,
  borderRadius: 8,
  border: '1px solid #ccc',
  backgroundColor: '#fafafa',
  marginTop: 20
};

const fieldStyle = {
  marginBottom: 15
};
