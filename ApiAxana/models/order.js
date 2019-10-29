'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    room_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    duration: DataTypes.TIME,
    order_time: DataTypes.TIME,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN
  }, {});
  order.associate = function (models) {
    // associations can be defined here
    // order.belongsTo(models.customer, {
    //   as: "CustomerId",
    //   foreignKey: "customer_id"
    // });
    // order.belongsTo(models.room, {
    //   as: "RoomId",
    //   foreignKey: "room_id"
    // });
  };
  return order;
};