'use strict';
module.exports = (sequelize, Datatypes) => {
  const permission = sequelize.define(
    'permission',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
      },
      function_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'function',
          key: 'id',
        },
      },
      is_access: {
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
      tableName: 'permission',
    }
  );
  return permission;
};
