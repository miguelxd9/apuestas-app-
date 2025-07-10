import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Event } from './src/events/entities/event.entity';
import { Bet } from './src/bets/entities/bet.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Event, Bet],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
