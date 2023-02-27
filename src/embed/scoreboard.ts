import {  EmbedBuilder } from 'discord.js';
import { PlayerType } from '../types/player';



export const createScoreboard = (scoreboard: PlayerType[]) => {

  const embed = new EmbedBuilder()
    .setTitle(`Classement`)
    .setColor('#0099ff')
    .setDescription(
      `
      ${scoreboard.map((player: PlayerType) => {
        return `${player.name} - ${player.score} points`
      })}
      `
    )

  return embed
}

