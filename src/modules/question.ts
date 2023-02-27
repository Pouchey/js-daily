import { Client, TextChannel } from 'discord.js';
import { db } from '../index';
import { getQuestion } from '../utils/questions';
import { createQuestion } from '../embed/question';


export const askQuestion = async (client:Client) => {

  // get all channels
  const channels = await db.getActiveChannels();

  if (!channels) return;
  // send question to each channel
  channels.forEach(async (channel) => {
    const question = getQuestion(channel.questionNumber);
    if (question) {
      const { embed, components } = createQuestion(question);
      const chan = await client.channels.fetch(channel.channelID) as TextChannel;
      if (chan) {
        chan.send({ embeds: [embed], components: [components as any] });
      }
    }

  });

}