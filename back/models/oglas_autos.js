'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oglas_autos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Autos}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Autos, {foreignKey: 'autoId', as: 'auto'});
    }
  };
  Oglas_autos.init({
    opis: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    cena: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Oglas_autos',
  });
  return Oglas_autos;
};