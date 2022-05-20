'use strict';
module.exports = (sequelize, Datatypes) => {
  const activityClass = sequelize.define(
    'activity_class',
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
      course_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      },
      faculty_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'faculty',
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
      tableName: 'activity_class',
    }
  );
  activityClass.associate = (models) => {
    activityClass.belongsTo(models.faculty, { foreignKey: 'faculty_id'});
    activityClass.belongsTo(models.course, { foreignKey: 'course_id'});
    activityClass.hasMany(models.student, { foreignKey: 'activity_class_id'});
  }
  return activityClass;
};
