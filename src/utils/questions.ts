
import questions from '../../ressources/questions.json';
import { QuestionType } from '../types/question';

export const getQuestion = (id: number) : QuestionType => {
    return questions[id] ;
}
