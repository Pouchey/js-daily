"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.default = (client) => {
    const eventsPath = (0, path_1.join)(__dirname, '../events');
    (0, fs_1.readdirSync)(eventsPath).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        const event = require(`${eventsPath}/${file}`).default;
        if ('name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, this));
            }
            else {
                client.on(event.name, (...args) => event.execute(...args, this));
            }
        }
        else {
            console.log(`[WARNING] The event at ${eventsPath} is missing a required "name" or "execute" property.`);
        }
        console.log(`🌠 Successfully loaded event ${event.name}`);
    });
};
//# sourceMappingURL=event.js.map