'use strict';
module.exports = (sequelize, Datatypes) => {
  const student = sequelize.define(
    'student',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
      },
      birthday: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      address: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      activity_class_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'activity_class',
          key: 'id',
        }
      },
      submitted_union_book_at: {
        type: Datatypes.DATE,
        allowNull: true,
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
    }
  );
  return student;
};
