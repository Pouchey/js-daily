import { QuestionType } from "../types/question";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';


export const createQuestion = (question: QuestionType) => {



  const embed = new EmbedBuilder()
    .setTitle(`Question ${question.questionNumber}: ${question.questionTitle}`)
    .setColor('#0099ff')
    .setDescription(
      ` \`\`\`${question.questionContent}
      \`\`\` 
      `
    )
    
    .addFields(
      question.answers.map((answer) => {
        return {
          name: answer.letter+ ':',
          value: answer.text,
        };
      })
    )
    .setFooter({
      text: 'Répondez avec les boutons ci-dessous',
    })
  
  const components = new ActionRowBuilder()

  const buttons = question.answers.map((answer) => {
    return new ButtonBuilder()
      .setCustomId(`${question.questionNumber}:${answer.letter}`)
      .setLabel(answer.letter)
      .setStyle(ButtonStyle.Primary)
      .setEmoji('✔️')
  }
  )

  components.addComponents(buttons)

  return {
    embed,
    components
  }
    

};