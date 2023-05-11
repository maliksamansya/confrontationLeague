'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tournament.belongsToMany(models.Team, { through: models.Teamtournament })
      Tournament.hasMany(models.Game, { foreignKey: 'TournamentId' })
      Tournament.hasMany(models.Teamtournament, { foreignKey: 'TournamentId' })


    }
  }
  Tournament.init({
    category: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};