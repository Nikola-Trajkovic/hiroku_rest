'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oglas_motors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Motors}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Motors, {foreignKey: 'motorId', as: 'motor'});
    }
  };
  Oglas_motors.init({
    opis: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    cena: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Oglas_motors',
  });
  return Oglas_motors;
};