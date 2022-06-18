'use strict';
module.exports = (sequelize, Datatypes) => {
  const func = sequelize.define(
    'function',
    {
      id: {
        type: Datatypes.STRING(10),
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      controller_name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      group_function_id: {
        type: Datatypes.STRING(10),
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
  func.associate = (models) => {
    func.belongsToMany(models.role, {
      through: models.permission,
      foreignKey: 'function_id',
    });
    func.belongsTo(models.groupFunction, {
      foreignKey: 'group_function_id',
    });
  };
  return func;
};
