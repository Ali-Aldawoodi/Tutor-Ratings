const { Users } = require('../models');

const usersData = [
  {
    users_name: 'Dru Sanchez',
    users_password: 'password123',
    users_email: 'dru@m.com',
  },
  {
    users_name: 'Trinh Nguyen',
    users_password: 'password123',
    users_email: 'trinh@m.com',
  },
  {
    users_name: 'Juan Delgado',
    users_password: 'password123',
    users_email: 'juan@m.com',
  },
];

const seedusers = () => Users.bulkCreate(usersData, {individualHooks: true, returning: true});

module.exports = seedusers;
