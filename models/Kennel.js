const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our kennel model
class Kennel extends Model { }

// Create fields/columns for kennel model
Kennel.init(
   {
      k_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      k_name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'kennel'
   }
);

module.exports = Kennel;
