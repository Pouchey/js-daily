import { Client } from "discord.js";
import cron from 'node-cron';
import { askQuestion } from "../modules/question";
import { showScoreboard } from "../modules/scoreboard";

export default {
	name: 'ready',
	once: true,
	execute: async (client: Client) => {
		console.log(`Ready! Logged in as ${client.user?.tag}`);

		// every day at 9:00:00 AM
		cron.schedule('0 9 * * *', async () => {
			await askQuestion(client);
		},{
			timezone: 'Europe/Paris'
		});

		// every day at 9:00:00 PM
		cron.schedule('0 21 * * *', async () => {
			await showScoreboard(client);
		},
		{
			timezone: 'Europe/Paris'
		}
		);
	},

};