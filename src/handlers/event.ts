import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Event } from '../types';

export default (client: Client) => {
    const eventsPath = join(__dirname, '../events');

    readdirSync(eventsPath).forEach((file) => {
        if (!file.endsWith('.js')) return;

        const event: Event = require(`${eventsPath}/${file}`).default;

        if ('name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, this));
            } else {
                client.on(event.name, (...args) => event.execute(...args, this));
            }
        } else {
            console.log(
                `[WARNING] The event at ${eventsPath} is missing a required "name" or "execute" property.`
            );
        }

        console.log(`🌠 Successfully loaded event ${event.name}`);
    });
};
