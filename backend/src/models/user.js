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
      username: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      is_active: {
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
    },
  );
  user.associate = (models) => {
    user.belongsToMany(models.role, {
      through: models.roleOfUser,
      foreignKey: 'user_id',
    });
    user.hasOne(models.student, {
      foreignKey: 'user_id',
    });
  };
  return user;
};
