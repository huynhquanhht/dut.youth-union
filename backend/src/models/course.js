'use strict';
module.exports = (sequelize, Datatypes) => {
  const course = sequelize.define(
    'course',
    {
      id: {
        type: Datatypes.INTEGER,
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
      tableName: 'course',
    }
  );
  course.associate = (models) => {
    course.hasMany(models.activityClass, {foreignKey: 'course_id'});
  }
  return course;
};
