const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our demeanor model
class Demeanor extends Model { }

// Create fields/columns for demeanor model
Demeanor.init(
   {
      d_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      d_desc: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'demeanor'
   }
);

module.exports = Demeanor;