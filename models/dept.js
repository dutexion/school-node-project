'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dept extends Model {
    static associate(models) {
      Dept.hasMany(models.Employee, {
        foreignKey: 'deptNo',
        sourceKey: 'deptNo',
      });
    }
  }
  Dept.init(
    {
      deptNo: {
        type: DataTypes.CHAR(4),
        primaryKey: true,
        allowNull: false,
        field: 'DEPT_NO',
      },
      deptName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        field: 'DEPT_NAME',
      },
      cellNo: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'CELL_NO',
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'STATUS',
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Dept',
      tableName: 'DEPT',
    }
  );
  return Dept;
};
