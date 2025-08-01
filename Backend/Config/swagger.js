import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Cursos y Estudiantes',
      version: '1.0.0',
      description: 'API para administrar cursos con estudiantes embebidos y autenticación JWT'
    },
    servers: [
      {
        url: 'http://localhost:'+ process.env.PORT +'/api',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./Routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
