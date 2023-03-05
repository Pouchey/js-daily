import {
    SlashCommandBuilder,
    CommandInteraction,
    TextChannel,
    PermissionFlagsBits,
    CommandInteractionOption
} from 'discord.js';
import { createQuestion } from '../embed/question';

import { db } from '../index';
import { getQuestion } from '../utils/questions';

export default {
    data: new SlashCommandBuilder()
        .setName('question')
        .setDescription(' Affiche la question du jour')
        .addStringOption((option) =>
            option.setName('number').setDescription('Numero de la question').setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: CommandInteraction) => {
        // @ts-ignore
        const arg = interaction.options?.getString('number') as string;

        const channelID = interaction.channelId;
        const channel = interaction.channel as TextChannel;
        const channelName = channel.name;

        db.getChannel(channelID)
            .then((c) => {
                if (c) {
                    const questionID = arg ? parseInt(arg) : c.questionNumber;
                    const question = getQuestion(questionID);
                    if (!question) {
                        interaction.reply({
                            content: `La question ${questionID} n'est pas disponible`,
                            ephemeral: true
                        });
                        return;
                    }
                    const { embed, components } = createQuestion(question);
                    interaction.reply({
                        embeds: [embed],
                        components: [components as any]
                    });
                } else {
                    interaction.reply({
                        content: `Le channel ${channelName} n'est pas enregistré dans la base de données`,
                        ephemeral: true
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                interaction.reply('Une erreur est survenue');
            });
    }
};
