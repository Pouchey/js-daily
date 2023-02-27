import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { REST, Routes } from 'discord.js';
import { Command } from '../types';

export default async (client: Client) => {
    const commandsPath = join(__dirname, '../commands');
    const body: Command[] = [];

    readdirSync(commandsPath).forEach((file) => {
        if (!file.endsWith('.js')) return;

        const command: Command = require(`${commandsPath}/${file}`).default;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${commandsPath} is missing a required "data" or "execute" property.`
            );
        }

        body.push(command.data.toJSON());
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        throw new Error('Error deploying commands');
    }
};
