"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
exports.default = async (client) => {
    const commandsPath = (0, path_1.join)(__dirname, '../commands');
    const body = [];
    (0, fs_1.readdirSync)(commandsPath).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        const command = require(`${commandsPath}/${file}`).default;
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${commandsPath} is missing a required "data" or "execute" property.`);
        }
        ;
        body.push(command.data.toJSON());
    });
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        throw new Error('Error deploying commands');
    }
};
//# sourceMappingURL=command.js.map