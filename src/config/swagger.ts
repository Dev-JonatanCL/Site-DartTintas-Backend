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
      contact: {
        name: 'Equipe Dart Tintas',
        email: 'suporte@darttintas.com',
      },
    },
    servers: [
      {
        url: 'https://site-darttintas-backend.azurewebsites.net',
        description: 'Servidor local de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
      displayRequestDuration: true,
      deepLinking: true,
      persistAuthorization: true,
      layout: 'BaseLayout',
      showExtensions: true,
      showCommonExtensions: true,
    },
    customCss: `
      /* Fonte limpa e tamanho maior */
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
      }

      .topbar {
        background-color: #4CAF50 !important;
      }

      .info h1 {
        font-size: 2em;
        color: #333;
      }

      .opblock {
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        padding: 8px;
      }

      .opblock-get {
        border-left: 5px solid #2196F3 !important; /* GET azul */
      }
      .opblock-post {
        border-left: 5px solid #4CAF50 !important; /* POST verde */
      }
      .opblock-put {
        border-left: 5px solid #FF9800 !important; /* PUT laranja */
      }
      .opblock-delete {
        border-left: 5px solid #F44336 !important; /* DELETE vermelho */
      }

      .opblock-summary-method {
        font-weight: bold;
        color: #555;
      }

      .opblock-summary-path {
        font-family: 'Courier New', monospace;
        font-size: 1em;
      }

      .scheme-container {
        background-color: #fff;
        border-radius: 8px;
        padding: 10px;
      }
    `,
    customSiteTitle: "Dart Tintas - API Docs",
  };

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerOptions));
  console.log('Swagger estilizado rodando em: https://site-darttintas-backend.azurewebsites.net//api-docs');
};
