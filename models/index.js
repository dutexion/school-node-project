const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Dept = require('./dept')(sequelize, Sequelize);
db.Employee = require('./employee')(sequelize, Sequelize);

// 관계 설정
db.Dept.hasMany(db.Employee, { foreignKey: 'deptNo', sourceKey: 'deptNo' });
db.Employee.belongsTo(db.Dept, { foreignKey: 'deptNo', targetKey: 'deptNo' });

module.exports = db;
