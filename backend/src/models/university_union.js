'use strict';
module.exports = (sequelize, Datatypes) => {
  const universityUnion = sequelize.define(
    'university_union',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: 'university_union',
    }
  );
  universityUnion.associate = (models) => {
    universityUnion.hasMany(models.faculty, {foreignKey: 'university_union_id'});
    universityUnion.hasMany(models.news, {foreignKey: 'university_union_id'});
  }
  return universityUnion;
};
