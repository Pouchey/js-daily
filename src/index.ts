import { TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
import Client from './config/Client';
import { initDB } from './utils/db';

dotenv.config();

export const client = new Client();
export const db = initDB();

client.start();
