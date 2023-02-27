import { SlashCommandBuilder, CommandInteraction, TextChannel } from 'discord.js';

import { db } from '../index';

export default {
  data: new SlashCommandBuilder()
    .setName('scoreboard')
    .setDescription('Affiche le classement des joueurs'),
  execute: async (interaction: CommandInteraction) => {
    const channelID = interaction.channelId;
    const channel = interaction.channel as TextChannel;
    const channelName = channel.name;

    await db.getChannel(channelID).then(async (channel) => {
      if(!channel)
        await interaction.reply({ content: `JS-Teacher n'est pas actif sur ce channel - ${channelName}!`, ephemeral: true });
        return;
    });

    await interaction.reply({ content: `Work in progress!`, ephemeral: true });
  },
};


