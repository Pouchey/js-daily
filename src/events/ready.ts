import { Client } from "discord.js";
import cron from 'node-cron';

export default {
	name: 'ready',
	once: true,
	execute: (client: Client) => {
		console.log(`Ready! Logged in as ${client.user?.tag}`);

		// every day at 9:00:00 AM
		cron.schedule('0 9 * * *', () => {
			console.log('running a task every day at 9:00:00 AM');
		});
	},

};