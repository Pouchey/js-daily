import {  EmbedBuilder } from 'discord.js';
import { PlayerType } from '../types/player';



export const createScoreboard = (scoreboard: PlayerType[]) => {

  const list : string = scoreboard.map((player: PlayerType) =>
    `**${player.name}** - ${player.score} points\n` 
  ).join('')

  const embed = new EmbedBuilder()
    .setTitle(`Classement :`)
    .setColor('#99ff00')
    .setDescription(
      `  
      ${list}
      `
    )

  return embed
}

