"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('start')
        .setDescription(' Initlialise les questions quotidiennes sur ce channel'),
    execute: async (interaction) => {
        const channelID = interaction.channelId;
        const channel = interaction.channel;
        const channelName = channel.name;
        await index_1.db.getChannel(channelID).then(async (channel) => {
            if (channel) {
                await interaction.reply({ content: `JS-Teacher est déjà actif sur ce channel - ${channelName}!`, ephemeral: true });
                return;
            }
            else {
                index_1.db.registerChannel(channelID).then(async () => {
                    await interaction.reply({
                        content: ` JS-Teacher a été activé avec succès sur ce channel - ${channelName}!`,
                        ephemeral: true
                    });
                });
            }
        })
            .catch(async (err) => {
            await interaction.reply({
                content: `Une erreur s'est produite lors de l'activation de JS-Teacher sur ce channel - ${channelName}!`,
                ephemeral: true
            });
        });
    },
};
//# sourceMappingURL=start.js.map