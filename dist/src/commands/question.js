"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const question_1 = require("../embed/question");
const index_1 = require("../index");
const questions_1 = require("../utils/questions");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('question')
        .setDescription(' Affiche la question du jour')
        .addStringOption((option) => option
        .setName('number')
        .setDescription('Numero de la question')
        .setRequired(false))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        // @ts-ignore
        const arg = interaction.options?.getString('number');
        const channelID = interaction.channelId;
        const channel = interaction.channel;
        const channelName = channel.name;
        index_1.db.getChannel(channelID)
            .then((c) => {
            if (c) {
                const questionID = arg ? parseInt(arg) : c.questionNumber;
                const question = (0, questions_1.getQuestion)(questionID);
                const { embed, components } = (0, question_1.createQuestion)(question);
                interaction.reply({
                    embeds: [embed],
                    components: [components],
                });
            }
            else {
                interaction.reply({
                    content: `Le channel ${channelName} n'est pas enregistré dans la base de données`,
                    ephemeral: true,
                });
            }
        })
            .catch((err) => {
            console.log(err);
            interaction.reply('Une erreur est survenue');
        });
    },
};
//# sourceMappingURL=question.js.map