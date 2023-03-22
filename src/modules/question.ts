import { Client, TextChannel } from 'discord.js';
import { db } from '../index';
import { getNextQuestionId, getQuestion } from '../utils/questions';
import { createQuestion } from '../embed/question';

export const askQuestion = async (client: Client) => {
    // get all channels
    const channels = await db.getActiveChannels();

    if (!channels) return;
    // send question to each channel
    channels.forEach(async (channel) => {
        // verify if the channel is still active
        const chan = (await client.channels.fetch(channel.channelID).catch(() => {
            db.unregisterChannel(channel.channelID);
            return;
        })) as TextChannel;

        const newQuestionNumber = getNextQuestionId(channel.questionNumber);
        db.updateQuestionNumber(channel.channelID, newQuestionNumber);
        const question = getQuestion(newQuestionNumber);

        if (question) {
            const { embed, components } = createQuestion(question);
            if (chan) {
                chan.send({ embeds: [embed], components: [components as any] });
            }
        }
    });
};
