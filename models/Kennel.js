const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kennel extends Model {}

Kennel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      dog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'canine',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'vote'
    }
  );
  
  module.exports = Kennel;
  