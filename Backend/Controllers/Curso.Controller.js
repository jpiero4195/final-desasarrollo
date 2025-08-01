
import CursoJeanShema from '../Models/Curso.Model.js';

const CursoController = {
  
  async crearCurso(req, res) {
    try {
      const curso = new CursoJeanShema(req.body);
      await curso.save();
      res.status(201).json({ message: 'Curso creado exitosamente', curso });
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el curso', error: error.message });
    }
  },

  async obtenerCursos(req, res) {
    try {
      const cursos = await CursoJeanShema.find().populate('estudiantes');
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los cursos', error: error.message });
    }
  },

  async obtenerCursoPorId(req, res) {
    try {
      const { cursoId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId).populate('estudiantes');
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el curso', error: error.message });
    }
  },

  async actualizarCurso(req, res) {
    try {
      const { cursoId } = req.params;
      const cursoActualizado = await CursoJeanShema.findByIdAndUpdate(cursoId, req.body, { new: true });
      if (!cursoActualizado) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json({ message: 'Curso actualizado exitosamente', curso: cursoActualizado });
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el curso', error: error.message });
    }
  },

  async eliminarCurso(req, res) {
    try {
      const { cursoId } = req.params;
      const cursoEliminado = await CursoJeanShema.findByIdAndDelete(cursoId);
      if (!cursoEliminado) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json({ message: 'Curso eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el curso', error: error.message });
    }
  },

  async agregarEstudiante(req, res) {
    try {
      const { cursoId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      curso.estudiantes.push(req.body);
      await curso.save();
      res.status(201).json({
        message: 'Estudiante agregado exitosamente',
        estudiante: curso.estudiantes[curso.estudiantes.length - 1]
      });
      } catch (error) {
        res.status(400).json({ message: 'Error al agregar el estudiante', error: error.message });
    }
  },

  async obtenerEstudiantes(req, res) {
    try {
      const { cursoId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId).populate('estudiantes');
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json(curso.estudiantes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los estudiantes', error: error.message });
    }
  },

  async obtenerEstudiantePorId(req, res) {
    try {
      const { cursoId, estudianteId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId).populate('estudiantes');
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      const estudiante = curso.estudiantes.id(estudianteId);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      res.status(200).json(estudiante);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el estudiante', error: error.message });
    }
  },

  async actualizarEstudiante(req, res) { 
    try {
      const { cursoId, estudianteId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      const estudiante = curso.estudiantes.id(estudianteId);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      Object.assign(estudiante, req.body);
      await curso.save();
      res.status(200).json({ message: 'Estudiante actualizado exitosamente', estudiante });
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el estudiante', error: error.message });
    }
  },

  async eliminarEstudiante(req, res) {
    try {
      const { cursoId, estudianteId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      const estudiante = curso.estudiantes.id(estudianteId);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      curso.estudiantes.pull({ _id: estudianteId });
      await curso.save();
      res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el estudiante', error: error.message });
    }
  },
  
  async obtenerPromediosEstudiantes(req, res) {
    try {
      const { cursoId } = req.params;
      const curso = await CursoJeanShema.findById(cursoId).populate('estudiantes');
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      const promedios = curso.estudiantes.map(est => ({
        nombre: est.nombres + ' ' + est.apellidos,
        email: est.email,
        nota_final: est.nota_final
      })).sort((a, b) => b.nota_final - a.nota_final);
      res.status(200).json(promedios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los promedios de estudiantes', error: error.message });
    }
  }

};

export default CursoController;