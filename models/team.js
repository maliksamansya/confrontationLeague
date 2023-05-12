'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Coach.hasOne(models.Team, { foreignKey: 'CoachId' })
      Team.belongsTo(models.Coach, { foreignKey: 'CoachId' })
      Team.hasMany(models.Player, { foreignKey: 'TeamId' })
      Team.hasMany(models.Teamtournament, { foreignKey: 'TeamId' })
      Team.belongsToMany(models.Tournament, { through: models.Teamtournament })
    }

    static filter(filter, data) {
      let option = {
        include: {
          model: data
        }
      }
      if (filter) {
        option.where = {
          name: {
            [Op.iLike]: `%${filter}%`,
          }
        }
      }
      return Team.findAll(option)

    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name is required'
        },
        notNull: {
          msg: 'name is required'
        }
      }

    },
    foundedYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'foundedYear is required'
        },
        notNull: {
          msg: 'foundedYear is required'
        }
      }

    },
    countryOfOrigin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'countryOfOrigin is required'
        },
        notNull: {
          msg: 'countryOfOrigin is required'
        }
      }

    },
    CoachId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};