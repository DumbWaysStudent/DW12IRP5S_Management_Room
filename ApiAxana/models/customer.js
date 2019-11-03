'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    'customer',
    {
      name: DataTypes.STRING,
      identity_card: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      imgae: DataTypes.STRING,
    },
    {},
  );
  customer.associate = function(models) {
    // associations can be defined here
    customer.belongsToMany(models.room, {
      through: 'order',
      foreignKey: 'customer_id',
    });
  };
  return customer;
};
