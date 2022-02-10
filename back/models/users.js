'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Oglas_autos,Oglas_motors}) {
      // define association here
      this.hasMany(Oglas_autos, {foreignKey: 'userId' , as: 'oglas_autos', onDelete: 'cascade', hooks: true });
      this.hasMany(Oglas_motors, {foreignKey: 'userId' , as: 'oglas_motors', onDelete: 'cascade', hooks: true });

    }
  };
  Users.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};