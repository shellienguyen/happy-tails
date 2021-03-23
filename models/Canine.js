const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our canine model
class Canine extends Model {}

// create fields/columns for canine model
Canine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dogName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: { //volunteer
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    breed:{
      type: DataTypes.STRING 
    },
    birthdate:{
        type: DataTypes.DATE
    },
    arrivaldate:{
        type: DataTypes.DATE
    },
    kennel_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'kennel',
            key: 'id'
          }
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

