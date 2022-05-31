'use strict';
module.exports = (sequelize, Datatypes) => {
  const activity = sequelize.define(
    'activity',
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      begin_at: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      end_at: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      place: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      organization_unit: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      participant_quantity: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      point: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      begin_registration_at: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      end_registration_at: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      content: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      cover_url: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      created_by: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      tableName: 'activity',
    }
  );
  activity.associate = (models) => {
    activity.belongsToMany(models.student, {
      through: models.registerJoin,
      foreignKey: 'activity_id',
    });
  };
  return activity;
};
