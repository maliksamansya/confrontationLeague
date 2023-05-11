'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Tournament, { foreignKey: 'TournamentId' })
    }

    get formatDate() {
      const tournament = new Date(this.date);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return tournament.toLocaleDateString('id-ID', options);
    }
  }
  Game.init({
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    TournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};