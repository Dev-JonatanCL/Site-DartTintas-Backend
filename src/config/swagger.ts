import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import type { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dart Tintas API',
      version: '1.0.0',
      description: 'API para gerenciamento de tintas da loja D’art Tintas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Tinta: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Tinta Azul Premium' },
            cor: { type: 'string', example: 'Azul' },
            tipo: { type: 'string', example: 'Acrílica' },
            preco: { type: 'number', example: 89.90 },
          },
        },
        TintaInput: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            cor: { type: 'string' },
            tipo: { type: 'string' },
            preco: { type: 'number' },
          },
          required: ['nome', 'cor', 'tipo', 'preco'],
        },
      },
    },
  },
  
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log('📘 Swagger rodando em: http://localhost:3000/api-docs');
};
