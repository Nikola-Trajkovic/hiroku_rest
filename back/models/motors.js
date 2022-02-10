'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Oglas_motors}) {
      // define association here
      this.hasMany(Oglas_motors, {foreignKey: 'motorId', as: 'oglas_motor' , onDelete: 'cascade', hooks: true});
    }
  };
  Motors.init({
    marka: DataTypes.STRING,
    model: DataTypes.STRING,
    godiste: DataTypes.INTEGER,
    kubikaza: DataTypes.INTEGER,
    kilometraza: DataTypes.INTEGER,
    tip: DataTypes.STRING,
    gorivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Motors',
  });
  return Motors;
};