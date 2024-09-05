import React, {FC} from 'react';
import {Autocomplete} from '../../../../../../../../../../../components/autocomplete';
import {useRecoilState} from 'recoil';
import {proposeAddressState} from '../../../state/meeting.state';
import {FormItemEditorProps} from '../../../../../../../../../../../components/formItem';

export const AddressEditor: FC<FormItemEditorProps> = ({closeModal}) => {
    const [proposeAddress, setProposeAddress] =
        useRecoilState(proposeAddressState);

    const autocompleteSelectHandler = (
        placeId: string,
        city: string,
        country: string,
    ) => {
        setProposeAddress({
            time: proposeAddress?.time,
            placeId,
            placeLabel: `${city}, ${country}`,
            lat: 0,
            lng: 0,
        });

        closeModal && closeModal();
    };

    return (
        <Autocomplete
            placeholder={proposeAddress?.placeLabel}
            onSelected={autocompleteSelectHandler}
        />
    );
};
