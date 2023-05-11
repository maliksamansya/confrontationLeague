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
    name: DataTypes.STRING,
    nationality: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
    position: DataTypes.STRING,
    TeamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};