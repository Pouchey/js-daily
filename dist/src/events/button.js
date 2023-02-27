"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const questions_1 = require("../utils/questions");
exports.default = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        if (!interaction.isButton())
            return;
        const { customId, user, channelId } = interaction;
        const { id: userId } = user;
        const [questionNumber, answerLetter] = customId.split(':');
        const question = (0, questions_1.getQuestion)(parseInt(questionNumber));
        if (!question)
            await interaction.reply({ content: 'Question introuvable!', ephemeral: true });
        const answer = await index_1.db.getAnswer(channelId, parseInt(questionNumber), userId);
        if (answer) {
            await interaction.reply({ content: 'Vous avez déjà répondu à cette question!', ephemeral: true });
            return;
        }
        const answerResponse = {
            userID: userId,
            channelID: channelId,
            questionNumber: parseInt(questionNumber),
            answer: answerLetter,
            isCorrect: question.bestAnswer.letter === answerLetter,
        };
        await index_1.db.updateAnswer(answerResponse);
        if (question.bestAnswer.letter === answerLetter)
            await interaction.reply({ content: 'Bonne réponse!', ephemeral: true });
        else
            await interaction.reply({ content: `Mauvaise réponse! \n \nLa bonne réponse était: ${question.bestAnswer.letter}${question.bestAnswer.text}`, ephemeral: true });
    },
};
//# sourceMappingURL=button.js.map