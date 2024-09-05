import {atom} from 'recoil';
import {Address} from '../../../../../../../../../service/apollo/generated';

export const proposeAddressState = atom<
    Omit<Address, 'id' | '__typename'> | null | undefined
>({
    key: 'proposeAddressState',
    default: undefined,
});
