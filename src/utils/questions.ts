
import questions from '../../ressources/questions.json';
import { QuestionType } from '../types/question';

export const getQuestion = (id: number) : QuestionType => {
    return questions[id] ;
}

export const getNextQuestionId = (id: number) : number => {
    if (id === 0) return 1;
    if (id === questions.length - 1) return 1;

    return id + 1;

}