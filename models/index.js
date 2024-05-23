'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Check if use_env_variable is defined in config
if (config.use_env_variable) {
  const dbUrl = process.env[config.use_env_variable];
  if (!dbUrl) {
    throw new Error(`Environment variable ${config.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(dbUrl, config);
} else {
  if (!config.database || !config.username || !config.password) {
    throw new Error('Database configuration is missing required fields (database, username, password)');
  }
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
