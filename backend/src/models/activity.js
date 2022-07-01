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
        type: Datatypes.STRING(255),
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
      school_year: {
        type: Datatypes.STRING(12),
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
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
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
