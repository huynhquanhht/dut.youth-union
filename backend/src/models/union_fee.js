'use strict';

module.exports = (sequelize, Datatypes) => {
  const unionFee = sequelize.define(
    'union_fee',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      school_year: {
        type: Datatypes.STRING(12),
        allowNull: false,
      },
      amount_of_money: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'union_fee',
    });
  unionFee.associate = (models) => {
    unionFee.belongsToMany(models.student, {
      through: models.submitUnionFee,
      foreignKey: 'union_fee_id'
    });
  }
  return unionFee;
};