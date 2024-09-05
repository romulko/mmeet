import {atom} from 'recoil';
import {Question} from '../Questions';

export const questionIdState = atom<Question['id']>({
    key: 'questionsQuestionIdState',
    default: -1,
});
