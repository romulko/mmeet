import {atom} from 'recoil';

export const avatarUpdateAtom = atom({
    key: 'avatarUpdate',
    default: Date.now(),
});
