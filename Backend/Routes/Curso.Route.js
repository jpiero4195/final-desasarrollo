import express from 'express';
import CursoController from '../Controllers/Curso.Controller.js';
import { authMiddleware } from '../Middlewares/Auth.Middleware.js';

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gestión de cursos y estudiantes
 */

const router = express.Router();
router.use(authMiddleware);

// Rutas para manejar cursos

/**
 * @swagger
 * /curso/cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreCurso
 *               - descripcion
 *               - duracionHoras
 *               - nombreDocente
 *             properties:
 *               nombreCurso:
 *                 type: string
 *                 example: Curso de Desarrollo Web
 *               descripcion:
 *                 type: string
 *                 example: breve descripción del curso
 *               duracionHoras:
 *                 type: integer
 *                 example: 10
 *               nombreDocente:
 *                 type: string
 *                 example: nombre del docente
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Curso creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: Token no válido o ausente
 */
router.post('/cursos', CursoController.crearCurso);

/**
 * @swagger
 * /curso/cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', CursoController.obtenerCursos);

/**
 * @swagger
 * /curso/cursos/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso no encontrado
 */
router.get('/cursos/:cursoId', CursoController.obtenerCursoPorId);

/**
 * @swagger
 * /curso/cursos/{id}:
 *   put:
 *     summary: Actualizar un curso existente
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCurso:
 *                 type: string
 *                 example: Curso de Node.js Intermedio
 *               descripcion:
 *                 type: string
 *                 example: Aprende a manejar rutas y middleware en Express
 *               duracionHoras:
 *                 type: integer
 *                 example: 30
 *               nombreDocente:
 *                 type: string
 *                 example: María García
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Curso actualizado exitosamente
 *                 curso:
 *                   $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Datos inválidos para actualizar
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 */
router.put('/cursos/:cursoId', CursoController.actualizarCurso);

/**
 * @swagger
 * /curso/cursos/{id}:
 *   delete:
 *     summary: Eliminar un curso por su ID
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Curso eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 */
router.delete('/cursos/:cursoId', CursoController.eliminarCurso);

// Rutas para manejar estudiantes dentro de un curso

/**
 * @swagger
 * /curso/cursos/{cursoId}/estudiantes:
 *   get:
 *     summary: Obtener la lista de estudiantes de un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cursoId:
 *                   type: string
 *                   example: 64b60bdb2b3aa63b8c49a55e
 *                 estudiantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       apellidos:
 *                         type: string
 *                         example: Valencia
 *                       nombres:
 *                         type: string
 *                         example: Jean Pierre
 *                       email:
 *                         type: string
 *                         example: jpvalencia@example.com
 *                       nota_final:
 *                         type: number
 *                         example: 9.2
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 */
router.post('/cursos/:cursoId/estudiantes', CursoController.agregarEstudiante);

/**
 * @swagger
 * /curso/cursos/{cursoId}/estudiantes:
 *   post:
 *     summary: Agregar estudiante a un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apellidos
 *               - nombres
 *               - email
 *               - nota_final
 *             properties:
 *               apellidos:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *               nota_final:
 *                 type: number
 *     responses:
 *       201:
 *         description: Estudiante agregado
 *       400:
 *         description: Error al agregar estudiante
 */
router.get('/cursos/:cursoId/estudiantes', CursoController.obtenerEstudiantes);

/**
 * @swagger
 * /curso/cursos/{cursoId}/estudiantes/{estudianteId}:
 *   put:
 *     summary: Actualizar datos de un estudiante en un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *       - in: path
 *         name: estudianteId
 *         required: true
 *         description: ID del estudiante a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apellidos:
 *                 type: string
 *                 example: Pérez
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               nota_final:
 *                 type: number
 *                 example: 8.7
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estudiante actualizado exitosamente
 *                 estudiante:
 *                   type: object
 *                   properties:
 *                     apellidos:
 *                       type: string
 *                     nombres:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nota_final:
 *                       type: number
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso o estudiante no encontrado
 */
router.put('/cursos/:cursoId/estudiantes/:estudianteId', CursoController.actualizarEstudiante);

/**
 * @swagger
 * /curso/cursos/{cursoId}/estudiantes/{estudianteId}:
 *   delete:
 *     summary: Eliminar un estudiante de un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *       - in: path
 *         name: estudianteId
 *         required: true
 *         description: ID del estudiante a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estudiante eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso o estudiante no encontrado
 */
router.delete('/cursos/:cursoId/estudiantes/:estudianteId', CursoController.eliminarEstudiante);

/**
 * @swagger
 * /curso/cursos/{cursoId}/promedios:
 *   get:
 *     summary: Obtener el promedio de notas finales de los estudiantes de un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Promedio calculado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cursoId:
 *                   type: string
 *                   example: 64b60bdb2b3aa63b8c49a55e
 *                 promedio:
 *                   type: number
 *                   example: 8.75
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 */
router.get('/cursos/:cursoId/promedios', CursoController.obtenerPromediosEstudiantes);

export default router;