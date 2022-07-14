'use strict'

module.exports = (seqeulize, Datatypes) => {
  const submitUnionFee = seqeulize.define(
    'submit_union_fee',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: Datatypes.STRING(9),
        allowNull: false,
        references: {
          model: 'student',
          key: 'id',
        }
      },
      union_fee_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'union_fee',
          key: 'id',
        }
      },
      submitted: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      submitted_at: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      class_confirmed: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      faculty_confirmed: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      school_confirmed: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      confirmed_by: {
        type: Datatypes.INTEGER,
        allowNull: true,
      }
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'submit_union_fee',
    });
  return submitUnionFee;
};