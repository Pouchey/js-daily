import {
    SlashCommandBuilder,
    CommandInteraction,
    TextChannel,
    PermissionFlagsBits
} from 'discord.js';

import { db } from '../index';

export default {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(' Initlialise les questions quotidiennes sur ce channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction: CommandInteraction) => {
        const channelID = interaction.channelId;
        const channel = interaction.channel as TextChannel;
        const channelName = channel.name;

        await db
            .getChannel(channelID)
            .then(async (channel) => {
                if (channel) {
                    await interaction.reply({
                        content: `JS-Teacher est déjà actif sur ce channel - ${channelName}!`,
                        ephemeral: true
                    });
                    return;
                } else {
                    db.registerChannel(channelID).then(async () => {
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
    }
};
