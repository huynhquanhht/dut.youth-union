'use strict';
module.exports = (sequelize, Datatypes) => {
  const func = sequelize.define(
    'function',
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
      type: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      controller_name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      action_name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      group_function_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'group_function',
          key: 'id',
        },
      }
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'function',
    }
  );
  return func;
};
