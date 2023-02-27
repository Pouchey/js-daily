import { ButtonInteraction } from "discord.js";

import { db } from '../index';
import { getQuestion } from "../utils/questions";

export default  {

  name:'interactionCreate',
  execute: async ( interaction : ButtonInteraction) => {
    
  if(!interaction.isButton())
    return;

  const { customId,user,channelId } = interaction;
  const { id:userId } = user;

  const [questionNumber, answerLetter] = customId.split(':');
  console.log(questionNumber, answerLetter);
  const question = getQuestion(parseInt(questionNumber));

  console.log(question);
  
  if(!question)
    await interaction.reply({ content: 'Question introuvable!', ephemeral: true });

  const answer = await db.getAnswer(channelId, parseInt(questionNumber), userId);  
  
  if(answer){
    await interaction.reply({ content: 'Vous avez déjà répondu à cette question!', ephemeral: true });
    return;
  }
  
  const answerResponse = {
    userID: userId,
    channelID: channelId,
    questionNumber: parseInt(questionNumber),
    answer: answerLetter,
    isCorrect: question.bestAnswer.letter === answerLetter,
  };


  await db.updateAnswer(answerResponse);

  if(question.bestAnswer.letter === answerLetter)
    await interaction.reply({ content: 'Bonne réponse!', ephemeral: true });
  else 
    await interaction.reply({ content: `Mauvaise réponse! \n \nLa bonne réponse était: ${question.bestAnswer.letter}${question.bestAnswer.text}`, ephemeral: true });
  },
  
};