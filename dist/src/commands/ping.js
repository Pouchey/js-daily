"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    },
};
//# sourceMappingURL=ping.js.map