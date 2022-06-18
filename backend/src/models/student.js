'use strict';
module.exports = (sequelize, Datatypes) => {
  const student = sequelize.define(
    'student',
    {
      id: {
        type: Datatypes.STRING(9),
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      activity_class_id: {
        type: Datatypes.STRING(255),
        allowNull: false,
        references: {
          model: 'activity_class',
          key: 'id',
        }
      },
      is_union_member: {
        type: Datatypes.BOOLEAN,
        allowNull: true,
      },
      is_class_secretary: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      user_id: {
        type: Datatypes.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
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
      tableName: 'student',
    },
  );
  student.associate = (models) => {
    student.belongsTo(models.activityClass, { foreignKey: 'activity_class_id'});
    student.hasOne(models.unionTextbook, { foreignKey: 'student_id'});
    student.belongsTo(models.user, { foreignKey: 'user_id' });
    student.belongsToMany(models.unionFee, {
      through: models.submitUnionFee,
      foreignKey: 'student_id',
    });
    student.belongsToMany(models.activity, {
      through: models.registerJoin,
      foreignKey: 'student_id',
    });
  }
  return student;
};
