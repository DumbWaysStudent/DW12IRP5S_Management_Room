'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          room_id: 2,
          customer_id: 2,
          duration: 1,
          order_time: new Time(),
          is_done: false,
          is_booked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {});
  },
};
