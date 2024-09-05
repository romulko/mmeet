import {atom} from 'recoil';
import {User} from '../../../../../../../../../service/apollo/generated';

export type InviteUser = Pick<User, 'id' | 'email'>;

export const InviteFriendState = atom<InviteUser | undefined>({
    key: 'InviteFriend',
    default: undefined,
});
