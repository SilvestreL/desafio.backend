import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { Dialect } from 'sequelize/types';



const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../config/config.js'))[env];

// 🔧 Instância do Sequelize
const sequelize = new Sequelize({
  dialect: config.dialect as Dialect,
  storage: config.storage,
  logging: config.logging ?? false,
});

// 🧠 Objeto de agregação dos modelos
const db: { [key: string]: any } = {};

// 🧾 Nome do próprio arquivo
const basename = path.basename(__filename);

// 📂 Importa todos os modelos dinamicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.endsWith('.ts') || file.endsWith('.js')) &&
      !file.endsWith('.d.ts')
    );
  })
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));
    const modelFactory = modelModule.default;

    if (typeof modelFactory === 'function') {
      const model = modelFactory(sequelize);
      db[model.name] = model;
    }
  });

// 🔗 Executa associações, se existirem
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

export default db;
export { sequelize };
