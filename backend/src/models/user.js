'use strict';
module.exports = (sequelize, Datatypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      birthday: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      gender: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
      },
      phone: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique:true,
      },
      address: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      username: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      isActive: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'user',
    }
  );
  return user;
};
