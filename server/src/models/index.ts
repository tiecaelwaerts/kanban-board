import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);
}

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Ticket };
