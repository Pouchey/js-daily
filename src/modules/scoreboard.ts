import { db } from '../index';
import { AnswerResponseType } from '../types/answer';
import { PlayerType, UserType } from '../types/player';
export const getScoreboard = async (channelID: string,users : UserType[]) => {
  const scoreboard = await db.getScoreboard(channelID);

  if(!scoreboard) return [];

  const players = scoreboard.reduce((acc: PlayerType[], answer: AnswerResponseType) => {
    const player = acc.find((player: PlayerType) => player.id === answer.userID);
    if (player) {
      player.score += answer.isCorrect ? 1 : 0;
    } else {
      acc.push({
        id: answer.userID,
        name: users.find((user) => user.id === answer.userID)?.name || 'Secret Ducky',
        score: answer.isCorrect ? 1 : 0,
      });
    }
    return acc;
  }, []);

  players.sort((a: PlayerType, b: PlayerType) => b.score - a.score);

  players.splice(10);

  return players;
}