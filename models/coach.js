'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coach.hasOne(models.Team, { foreignKey: 'CoachId' })
    }
  }
  Coach.init({
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be Null"
        },
        notEmpty: {
          msg: "email cannot be Empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be Null"
        },
        notEmpty: {
          msg: "password cannot be Empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Coach',
  });

  Coach.beforeCreate((data) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash
  })
  return Coach;
};