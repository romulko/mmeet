import {atom} from 'recoil';
import {User} from '../../../service/apollo/generated';

export const userIdState = atom<User['id']>({
    key: 'questionsUserIdState',
    default: -1,
});
