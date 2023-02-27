import { SlashCommandBuilder, CommandInteraction, TextChannel } from 'discord.js';
import { createQuestion } from '../embed/question';

import { db } from '../index';
import { getQuestion } from '../utils/questions';


export default {
  data: new SlashCommandBuilder()
    .setName('question')
    .setDescription(' Affiche la question du jour'),
  execute: async (interaction: CommandInteraction) => {
    const channelID = interaction.channelId;
    const channel = interaction.channel as TextChannel;
    const channelName = channel.name;

    db.getChannel(channelID)
      .then((c) => {
        if (c) {
          const questionID = c.questionNumber;
          const question = getQuestion(questionID);
          const {embed,components} = createQuestion(question);
          interaction.reply(
            {
              embeds: [embed],
              components: [components as any],
            },
          );
        } else {
          interaction.reply({
            content: `Le channel ${channelName} n'est pas enregistré dans la base de données`,
            ephemeral: true,
          });
        }
      }
      )
      .catch((err) => {
        console.log(err);
        interaction.reply('Une erreur est survenue');
      }
      );


  },
};


