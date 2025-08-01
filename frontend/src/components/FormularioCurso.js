import React, { useState, useEffect } from 'react';
import api from '../api';

function FormularioCurso({ curso, onCancel, onSuccess }) {
  const [nombreCurso, setNombreCurso] = useState('');
  const [nombreDocente, setNombreDocente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracionHoras, setDuracionHoras] = useState('');

  useEffect(() => {
    if (curso) {
      setNombreCurso(curso.nombreCurso);
      setNombreDocente(curso.nombreDocente);
      setDescripcion(curso.descripcion);
      setDuracionHoras(curso.duracionHoras);
    }
  }, [curso]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombreCurso,
      nombreDocente,
      descripcion,
      duracionHoras: parseInt(duracionHoras)
    };

    try {
      if (curso) {
        await api.put(`/curso/actualizar/${curso._id}`, datos);
        alert('Curso actualizado');
      } else {
        await api.post('/curso/crear', datos);
        alert('Curso creado');
      }
      onSuccess();
    } catch (err) {
      alert('Error al guardar curso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{curso ? 'Editar Curso' : 'Nuevo Curso'}</h3>

      <div style={fieldStyle}>
        <label>Nombre del Curso:</label>
        <input
          type="text"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
          required
        />
      </div>

      <div style={fieldStyle}>
        <label>Docente:</label>
        <input
          type="text"
          value={nombreDocente}
          onChange={(e) => setNombreDocente(e.target.value)}
          required
        />
      </div>

      <div style={fieldStyle}>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <div style={fieldStyle}>
        <label>Duración (Horas):</label>
        <input
          type="number"
          value={duracionHoras}
          onChange={(e) => setDuracionHoras(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioCurso;

const fieldStyle = {
  marginBottom: 10,
  display: 'flex',
  flexDirection: 'column'
};
