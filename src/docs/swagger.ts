import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Boletos - Desafio Técnico',
      version: '1.0.0',
      description: 'Documentação Swagger dos endpoints da API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // URL base da API
      },
    ],
  },
  apis: [
    './src/api/routes/**/*.ts', // Inclua todos os arquivos de rotas
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };