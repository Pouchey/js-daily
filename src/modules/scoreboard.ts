import { Client, Collection, GuildMember, TextChannel } from 'discord.js';
import { db } from '../index';
import { AnswerResponseType } from '../types/answer';
import { PlayerType, UserType } from '../types/player';
import { createScoreboard } from '../embed/scoreboard';
import { getUsers } from './users';

export const getScoreboard = async (channelID: string, users: UserType[]) => {
    const scoreboard = await db.getScoreboard(channelID);

    if (!scoreboard) return [];

    const players = scoreboard.reduce((acc: PlayerType[], answer: AnswerResponseType) => {
        const player = acc.find((player: PlayerType) => player.id === answer.userID);
        if (player) {
            player.score += answer.isCorrect ? 1 : 0;
        } else {
            acc.push({
                id: answer.userID,
                name: users.find((user) => user.id === answer.userID)?.name || 'Secret Ducky',
                score: answer.isCorrect ? 1 : 0
            });
        }
        return acc;
    }, []);

    players.sort((a: PlayerType, b: PlayerType) => b.score - a.score);

    // limit to 10 players
    // players.splice(10);

    return players;
};

export const showScoreboard = async (client: Client) => {
    // get all channels
    const channels = await db.getActiveChannels();

    if (!channels) return;
    // send question to each channel
    channels.forEach(async (channel) => {
        const c = (await client.channels.fetch(channel.channelID)) as TextChannel;

        if (c) {
            // fetch members
            const members = await c?.guild?.members.fetch();
            const users = await getUsers(members);

            const scoreboard = await getScoreboard(channel.channelID, users);
            if (!scoreboard.length) {
                return;
            }

            const embed = createScoreboard(scoreboard);

            c.send({ embeds: [embed] });
        }
    });
};
