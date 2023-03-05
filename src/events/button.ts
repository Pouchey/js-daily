import { ButtonInteraction } from 'discord.js';

import { db } from '../index';
import { getQuestion } from '../utils/questions';
import { truncate } from '../utils/string';

export default {
    name: 'interactionCreate',
    execute: async (interaction: ButtonInteraction) => {
        if (!interaction.isButton()) return;

        const { customId, user, channelId } = interaction;
        const { id: userId } = user;

        const [questionNumber, answerLetter] = customId.split(':');
        const question = getQuestion(parseInt(questionNumber));

        if (!question) {
            await interaction.reply({ content: 'Question introuvable!', ephemeral: true });
            return;
        }

        const answer = await db.getAnswer(channelId, parseInt(questionNumber), userId);

        if (answer) {
            await interaction.reply({
                content: 'Vous avez déjà répondu à cette question!',
                ephemeral: true
            });
            return;
        }

        const answerResponse = {
            userID: userId,
            channelID: channelId,
            questionNumber: parseInt(questionNumber),
            answer: answerLetter,
            isCorrect: question.bestAnswer.letter === answerLetter
        };

        await db.updateAnswer(answerResponse);

        if (question.bestAnswer.letter === answerLetter)
            await interaction.reply({
                content: `Bonne réponse! \n Explication : \n ${truncate(
                    question.bestAnswer.text,
                    1500
                )}`,
                ephemeral: true
            });
        else
            await interaction.reply({
                content: `Mauvaise réponse! \n \nLa bonne réponse était: ${
                    question.bestAnswer.letter
                }${truncate(question.bestAnswer.text, 1500)}`,
                ephemeral: true
            });
    }
};
