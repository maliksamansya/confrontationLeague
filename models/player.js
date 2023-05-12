'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Team.hasMany(models.Player, { foreignKey: 'TeamId' })
      Player.belongsTo(models.Team, { foreignKey: 'TeamId' })
    }

    get captain() {
      if (this.position === 'DMF') {
        return this.name = `${this.name} (CAPTAIN)`
      } else {
        return this.name
      }
    }
  }
  Player.init({
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
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'nationality is required'
        },
        notNull: {
          msg: 'nationality is required'
        }
      }
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'birthYear is required'
        },
        notNull: {
          msg: 'birthYear is required'
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'position is required'
        },
        notNull: {
          msg: 'position is required'
        }
      }
    },
    TeamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};