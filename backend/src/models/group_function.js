'use strict';
module.exports = (sequelize, Datatypes) => {
  const groupFunction = sequelize.define(
    'group_function',
    {
      id: {
        type: Datatypes.STRING(10),
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
      tableName: 'group_function',
    }
  );
  groupFunction.associate = (models) => {
    groupFunction.hasMany(models.func, {
      foreignKey: 'group_function_id',
    });
  };
  return groupFunction;
};
