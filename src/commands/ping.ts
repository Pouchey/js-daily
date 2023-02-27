import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    }
};
