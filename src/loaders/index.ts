import * as express from 'express';
import sequelizeLoader from './sequelize';
import server from './server';
import { swaggerUi, swaggerSpec } from '../docs/swagger';

export default async (app: express.Application) => {
  await sequelizeLoader();
  console.log('🟢 DB conectado com Sequelize!');

  // Configuração do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  await server(app);
  console.log('🚀 Servidor carregado!');
};