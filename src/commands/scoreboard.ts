import { SlashCommandBuilder, CommandInteraction, TextChannel } from 'discord.js';
import { createScoreboard } from '../embed/scoreboard';

import { db } from '../index';
import { getScoreboard } from '../modules/scoreboard';
import { getUsers } from '../modules/users';

export default {
    data: new SlashCommandBuilder()
        .setName('scoreboard')
        .setDescription('Affiche le classement des joueurs'),
    execute: async (interaction: CommandInteraction) => {
        const channelID = interaction.channelId;
        const channel = interaction.channel as TextChannel;
        const channelName = channel.name;
        await db.getChannel(channelID).then(async (c) => {
            if (!c) {
                await interaction.reply({
                    content: `JS-Teacher n'est pas actif sur ce channel - ${channelName}!`,
                    ephemeral: true
                });
                return;
            }
            const members = await interaction?.guild?.members.fetch();
            const users = await getUsers(members);
            const scoreboard = await getScoreboard(channelID, users);
            if (!scoreboard.length) {
                await interaction.reply({ content: `Scoreboard vide!`, ephemeral: true });
                return;
            }

            const embed = createScoreboard(scoreboard);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
};
