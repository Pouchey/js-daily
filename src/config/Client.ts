import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
            failIfNotExists: false,
            rest: {
                retries: 3,
                timeout: 15_000
            }
        });
        this.commands = new Collection();
    }

    async reset() {
        if (!process.env.TOKEN || !process.env.CLIENT_ID)
            throw new Error('Missing environment variables');

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        await rest
            .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
            .catch((err) => {
                throw new Error('Error deleting commands');
            });

        console.log('Bot reset');
    }

    async loadHandlers() {
        const handlersPath = join(__dirname, '../handlers');

        readdirSync(handlersPath).forEach((file) => {
            if (!file.endsWith('.js')) return;

            const handler = require(`${handlersPath}/${file}`).default;

            handler(this);
        });
    }

    async start() {
        this.loadHandlers().catch((err) => {
            throw new Error('Error loading handlers');
        });
        this.login(process.env.TOKEN).catch((err) => {
            throw new Error('Error logging in to Discord');
        });
    }
}

export default ExtendedClient;
