'use strict';
module.exports = (sequelize, Datatypes) => {
  const role = sequelize.define(
    'role',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'role',
    }
  );
  role.associate = (models) => {
    role.belongsToMany(models.user, {
      through: models.roleOfUser,
      foreignKey: 'role_id',
    });
    role.belongsToMany(models.func, {
      through: models.permission,
      foreignKey: 'role_id',
    });
  };
  return role;
};
