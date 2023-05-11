'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teamtournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teamtournament.belongsTo(models.Team, { foreignKey: 'TeamId' })
      Teamtournament.belongsTo(models.Tournament, { foreignKey: 'TournamentId' })

    }
  }
  Teamtournament.init({
    TeamId: DataTypes.INTEGER,
    TournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teamtournament',
  });
  return Teamtournament;
};