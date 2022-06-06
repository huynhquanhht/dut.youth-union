'use strict';
module.exports = (sequelize, Datatypes) => {
  const news = sequelize.define(
    'news',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      cover_url: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      content: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      university_union_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'university_union',
          key: 'id',
        }
      },
      // 1: Information
      // 2: Notification
      category: {
        type: Datatypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'news',
    }
  );
  news.associate = (models) => {
    news.belongsTo(models.universityUnion, {foreignKey: 'university_union_id'});
  }
  return news;
};
