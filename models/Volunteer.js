const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Volunteer extends Model {
   // set up method to run on instance data (per user) to check password
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
};

Volunteer.init(
   {
      v_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {len: [6]}
      },
      v_fname: {
         type: DataTypes.STRING,
         allowNull: false
      },
      v_lname: {
         type: DataTypes.STRING,
         allowNull: false,
      }
   },
   {
      hooks: {
         // set up beforeCreate lifecycle "hook" functionality
         async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          // set up beforeUpdate lifecycle "hook" functionality
          async beforeUpdate(updatedUserData) {
             updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
             return updatedUserData;
          }

      },
      sequelize,
      // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
      // don't pluralize name of database table
      freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
      // make it so our model name stays lowercase in the database
      modelName: 'volunteer'
   }
);

module.exports = Volunteer;