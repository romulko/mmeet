import {atom} from 'recoil';

export const nextButtonEnabledState = atom<boolean>({
    key: 'nextButtonEnabledState',
    default: false,
});
