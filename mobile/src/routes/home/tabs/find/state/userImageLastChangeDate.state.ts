import {atom} from 'recoil';

export const userImageLastChangeDateState = atom({
    key: 'userImageLastChangeDateState',
    default: Date.now(),
});
