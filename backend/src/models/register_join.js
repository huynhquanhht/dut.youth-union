'use strict';
module.exports = (sequelize, Datatypes) => {
  const registerJoin = sequelize.define(
    'register_join',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Datatypes.INTEGER,
        references: {
          model: 'student',
          key: 'id',
        }
      },
      activity_id: {
        type: Datatypes.INTEGER,
        references: {
          model: 'activity',
          key: 'id',
        }
      },
      registered_at: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      attended_at: {
        type: Datatypes.DATE,
        allowNull: true,
      }
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      tableName: 'register_join',
    }
  );
  registerJoin.associate = (models) => {};
  return registerJoin;
};
