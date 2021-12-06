import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
await User.sync();

try {
  await sequelize.authenticate();
  console.log('DB on!');
} catch (error) {
  console.error('DB error: ', error);
};

export default User;
