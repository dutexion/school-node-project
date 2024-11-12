'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Dept, {
        foreignKey: 'deptNo',
        targetKey: 'deptNo',
      });
    }
  }
  Employee.init(
    {
      pNo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'P_NO',
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        field: 'NAME',
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'SALARY',
      },
      deptNo: {
        type: DataTypes.CHAR(4),
        allowNull: true,
        field: 'DEPT_NO',
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Employee',
      tableName: 'EMPLOYEE',
    }
  );
  return Employee;
};
