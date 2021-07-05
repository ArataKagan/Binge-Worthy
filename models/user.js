const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    verificationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.prototype.isValidPassword = function (password){
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};