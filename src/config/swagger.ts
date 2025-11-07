import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import type { Express } from 'express';
import path from 'path';

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
        description: 'Servidor de Produção (Azure)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local (Desenvolvimento)',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts').replace(/\\/g, '/'),
  ],
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
      tryItOutEnabled: true,
    },
    customCss: `
      body { font-family: 'Segoe UI', sans-serif; background: #f4f6f9; }
      .topbar { background: linear-gradient(135deg, #4CAF50, #388E3C) !important; }
      .info h1 { font-size: 2.2em; color: #2c3e50; }
      .opblock { border-radius: 10px; margin: 12px 0; box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
      .opblock-get { border-left: 6px solid #2196F3 !important; }
      .opblock-post { border-left: 6px solid #4CAF50 !important; }
      .opblock-put { border-left: 6px solid #FF9800 !important; }
      .opblock-delete { border-left: 6px solid #F44336 !important; }
      .btn.execute { background: #4CAF50 !important; color: white; }
      .btn.execute:hover { background: #388E3C !important; }
      .scheme-container { background: white; border-radius: 10px; padding: 12px; }
      .models { display: none !important; }
    `,
    customSiteTitle: "Dart Tintas - API Docs",
    customfavIcon: '/favicon.ico',
  };


  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, swaggerOptions)
  );

  app.get('/api-docs', (req, res) => {
    res.redirect('/api-docs/');
  });

};
