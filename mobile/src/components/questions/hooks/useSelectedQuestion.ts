import {useQuestions} from './useQuestions';
import {useRecoilValue} from 'recoil';
import {questionIdState} from '../state/questionId.state';

export const useSelectedQuestion = () => {
    const questionId = useRecoilValue(questionIdState);
    const {questions} = useQuestions();

    return {
        selectedQuestion: questions?.find(value => value.id === questionId)!,
    };
};
