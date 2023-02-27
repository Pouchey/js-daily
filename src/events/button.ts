import { ButtonInteraction } from "discord.js";
import { getQuestion } from "../utils/questions";

export default  {

  name:'interactionCreate',
  execute: async ( interaction : ButtonInteraction) => {
    
  if(!interaction.isButton())
    return;

  const { customId,user } = interaction;
  const { id:userId } = user;

  const [questionNumber, answerLetter] = customId.split(':');

  const question = getQuestion(parseInt(questionNumber));

  if(!question)
    await interaction.reply({ content: 'Question introuvable!', ephemeral: true });

  if(question.bestAnswer.letter === answerLetter)
    await interaction.reply({ content: 'Bonne réponse!', ephemeral: true });
  else 
    await interaction.reply({ content: `Mauvaise réponse! \nLa bonne réponse était: ${question.bestAnswer.letter}\n ${question.bestAnswer.text}`, ephemeral: true });
  },
  
};