"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = require("../utils/questions");
exports.default = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        if (!interaction.isButton())
            return;
        const { customId } = interaction;
        console.log(interaction);
        const [questionNumber, answerLetter] = customId.split(':');
        const question = (0, questions_1.getQuestion)(parseInt(questionNumber));
        if (!question)
            await interaction.reply({ content: 'Question introuvable!', ephemeral: true });
        if (question.bestAnswer.letter === answerLetter)
            await interaction.reply({ content: 'Bonne réponse!', ephemeral: true });
        else
            await interaction.reply({ content: `Mauvaise réponse! \nLa bonne réponse était: ${question.bestAnswer.letter}\n ${question.bestAnswer.text}`, ephemeral: true });
    },
};
//# sourceMappingURL=button.js.map