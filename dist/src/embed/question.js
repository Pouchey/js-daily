"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestion = void 0;
const discord_js_1 = require("discord.js");
const createQuestion = (question) => {
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Question ${question.questionNumber}: ${question.questionTitle}`)
        .setColor('#0099ff')
        .setDescription(` \`\`\`${question.questionContent}
      \`\`\` 
      `)
        .addFields(question.answers.map((answer) => {
        return {
            name: answer.letter + ':',
            value: answer.text,
        };
    }))
        .setFooter({
        text: 'Répondez avec les boutons ci-dessous',
    });
    const components = new discord_js_1.ActionRowBuilder();
    const buttons = question.answers.map((answer) => {
        return new discord_js_1.ButtonBuilder()
            .setCustomId(`${question.questionNumber}:${answer.letter}`)
            .setLabel(answer.letter)
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setEmoji('✔️');
    });
    components.addComponents(buttons);
    return {
        embed,
        components
    };
};
exports.createQuestion = createQuestion;
//# sourceMappingURL=question.js.map