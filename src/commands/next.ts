import {
    SlashCommandBuilder,
    CommandInteraction,
    TextChannel,
    PermissionFlagsBits
} from 'discord.js';
import { createQuestion } from '../embed/question';

import { db } from '../index';
import { getQuestion, getNextQuestionId } from '../utils/questions';

export default {
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription(' Affiche la question suivante')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction: CommandInteraction) => {
        const channelID = interaction.channelId;
        const channel = interaction.channel as TextChannel;
        const channelName = channel.name;

        db.getChannel(channelID)
            .then((c) => {
                if (c) {
                    const questionID = c.questionNumber;
                    const newQuestionNumber = getNextQuestionId(questionID);

                    db.updateQuestionNumber(channelID, newQuestionNumber);

                    const question = getQuestion(newQuestionNumber);
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
