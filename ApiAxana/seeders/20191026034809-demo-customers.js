'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('customers', [
      {
        name: 'Ayu Mona',
        identity_card: 1089765,
        phone_number: 082276895643,
        image: www.image.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rina Trisna',
        identity_card: 2098764,
        phone_number: 082187658965,
        image: www.image.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rozi Saputra',
        identity_card: 3098654,
        phone_number: 082211776655,
        image: www.image.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asade Kon',
        identity_card: 4567841,
        phone_number: 6969819,
        image: www.image.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('customers', null, {});

  }
};
