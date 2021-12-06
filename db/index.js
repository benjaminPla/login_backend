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
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
await User.sync({ force: true });

const admin = await User.create({ email: 'admin@admin.com', password: '1234'} );

try {
  await sequelize.authenticate();
  console.log('DB on!');
} catch (error) {
  console.error('DB error: ', error);
};

export default User;
