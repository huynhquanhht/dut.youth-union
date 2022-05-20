'use strict';
module.exports = (sequelize, Datatypes) => {
  const roleOfUser = sequelize.define(
    'role_of_user',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Datatypes.INTEGER,
        primaryKey: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      role_id: {
        type: Datatypes.INTEGER,
        references: {
          model: 'role',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'role_of_user',
    }
  );
  roleOfUser.associate = (models) => {};
  return roleOfUser;
};
