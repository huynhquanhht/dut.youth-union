'use strict';
module.exports = (sequelize, Datatypes) => {
  const unionTextbook = sequelize.define(
    'union_textbook',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      submitted: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      submitted_at: {
        type: Datatypes.DATEONLY,
        allowNull: true,
      },
      class_confirmed: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      school_confirmed: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      student_id: {
        type: Datatypes.STRING(9),
        references: {
          model: 'student',
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
      tableName: 'union_textbook',
    });
  unionTextbook.associate = (models) => {
    unionTextbook.belongsTo(models.student, { foreignKey: 'student_id'});
  }
  return unionTextbook;
};
