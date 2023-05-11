'use strict';
const {
  Model
} = require('sequelize');
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
  }
  Team.init({
    name: DataTypes.STRING,
    foundedYear: DataTypes.STRING,
    countryOfOrigin: DataTypes.STRING,
    CoachId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};