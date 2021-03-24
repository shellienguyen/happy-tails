const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our canine model
class Canine extends Model { }

// Create fields/columns for canine model
Canine.init(
   {
      c_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      c_name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      c_demeanor: {
         type: DataTypes.INTEGER,
         allowNull: true
      },
      has_walked_am: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: { model: 'volunteer', key: 'v_id' }
      },
      has_walked_pm: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: { model: 'volunteer', key: 'v_id' }
      },
      has_potty_am: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: { model: 'volunteer', key: 'v_id' }
      },
      has_potty_pm: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: { model: 'volunteer', key: 'v_id' }
      },
      k_id: {
         type: DataTypes.INTEGER,
         allowNull: true
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'canine'
   }
);

module.exports = Canine;