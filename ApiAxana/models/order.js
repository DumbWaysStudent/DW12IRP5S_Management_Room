'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    'order',
    {
      room_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      duration: DataTypes.TIME,
      order_time: DataTypes.TIME,
      is_done: DataTypes.BOOLEAN,
      is_booked: DataTypes.BOOLEAN,
    },
    {},
  );
  order.associate = function(models) {
    order.belongsTo(models.customer, {
      foreignKey: 'customer_id',
      sourceKey: 'id',
    });
    order.belongsTo(models.room, {
      foreignKey: 'room_id',
      sourceKey: 'id',
    });
  };
  return order;
};
