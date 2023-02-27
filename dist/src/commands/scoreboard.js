"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('scoreboard')
        .setDescription('Affiche le classement des joueurs'),
    execute: async (interaction) => {
        const channelID = interaction.channelId;
        const channel = interaction.channel;
        const channelName = channel.name;
        await index_1.db.getChannel(channelID).then(async (channel) => {
            if (!channel)
                await interaction.reply({ content: `JS-Teacher n'est pas actif sur ce channel - ${channelName}!`, ephemeral: true });
            return;
        });
        await interaction.reply({ content: `Work in progress!`, ephemeral: true });
    },
};
//# sourceMappingURL=scoreboard.js.map