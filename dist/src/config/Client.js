"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
            ],
            failIfNotExists: false,
            rest: {
                retries: 3,
                timeout: 15000
            }
        });
        this.commands = new discord_js_1.Collection();
    }
    ;
    async reset() {
        if (!process.env.TOKEN || !process.env.CLIENT_ID)
            throw new Error('Missing environment variables');
        const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN);
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: [] }).catch((err) => {
            throw new Error('Error deleting commands');
        });
        console.log('Bot reset');
    }
    async loadHandlers() {
        const handlersPath = (0, path_1.join)(__dirname, '../handlers');
        (0, fs_1.readdirSync)(handlersPath).forEach(file => {
            if (!file.endsWith(".js"))
                return;
            const handler = require(`${handlersPath}/${file}`).default;
            handler(this);
        });
    }
    ;
    async start() {
        this.loadHandlers().catch((err) => {
            throw new Error('Error loading handlers');
        });
        this.login(process.env.TOKEN).catch((err) => {
            throw new Error('Error logging in to Discord');
        });
    }
    ;
}
;
exports.default = ExtendedClient;
//# sourceMappingURL=Client.js.map