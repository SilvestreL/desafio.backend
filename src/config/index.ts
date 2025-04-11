import * as dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error('❌ .env file not found!');
}

export default {
  /**
   * Porta onde a aplicação será iniciada
   */
  port: parseInt(process.env.PORT || '3000', 10),

  /**
   * Caminho para o banco SQLite
   */
  database: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../../dev.sqlite'), 
    logging: false,
  }
};