'use strict';
module.exports = (sequelize, Datatypes) => {
  const faculty = sequelize.define(
    'faculty',
    {
      id: {
        type: Datatypes.STRING(3),
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: Datatypes.STRING(11),
        allowNull: true,
      },
      university_union_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'university_union',
          key: 'id',
        }
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'faculty',
    }
  );
  faculty.associate = (models) => {
    faculty.hasMany(models.activityClass, {foreignKey: 'faculty_id'});
    faculty.hasMany(models.lecture, {foreignKey: 'faculty_id'});
    faculty.belongsTo(models.universityUnion, {foreignKey: 'university_union_id'});
  }
  return faculty;
};
