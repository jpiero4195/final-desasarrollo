import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  apellidos: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [50, 'El apellido no puede superar los 50 caracteres']
  },
  nombres: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede superar los 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  },
  nota_final: {
    type: Number,
    required: true,
    min: [0, 'La nota final no puede ser menor que 0'],
    max: [10, 'La nota final no puede ser mayor que 10']
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

const CursoJeanShema = new Schema({
  nombreCurso: {
    type: String,
    required: [true, 'El nombre del curso es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre del curso no puede superar los 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del curso es obligatoria'],
    trim: true,
    maxlength: [500, 'La descripción del curso no puede superar los 500 caracteres']
  },
  duracionHoras: {
    type: Number,
    required: [true, 'La duración del curso es obligatoria'],
    min: [1, 'La duración del curso debe ser al menos 1 hora'],
    max: [1000, 'La duración del curso no puede superar las 1000 horas']
  },
  nombreDocente: {
    type: String,
    required: [true, 'El nombre del docente es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre del docente no puede superar los 100 caracteres']
  },
  estudiantes: [studentSchema]
});

CursoJeanShema.pre('save', async function(next) {
  const estudiantesEmails = this.estudiantes.map(est => est.email);
  const uniqueEmails = new Set(estudiantesEmails);
  if (estudiantesEmails.length !== uniqueEmails.size) {
    return next(new Error('No se pueden agregar estudiantes con correos electrónicos duplicados'));
  }
  next();
});

export default model('Cursos', CursoJeanShema);
