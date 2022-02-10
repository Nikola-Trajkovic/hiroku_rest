'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Oglas_autos}) {
      // define association here
      this.hasMany(Oglas_autos, {foreignKey: 'autoId', as: 'oglas_auto' , onDelete: 'cascade', hooks: true});
    }
  };
  Autos.init({
    marka: DataTypes.STRING,
    model: DataTypes.STRING,
    godiste: DataTypes.INTEGER,
    kilometraza: DataTypes.INTEGER,
    menjac: DataTypes.STRING,
    gorivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Autos',
  });
  return Autos;
};