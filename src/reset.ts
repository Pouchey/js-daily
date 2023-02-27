import * as dotenv from 'dotenv';
import Client from './config/Client';

dotenv.config();

export const client = new Client();
client.reset();
