import React, {FC} from 'react';
import {GenderChooser} from '../../genderChooser';
import {
    GenderType,
    useUserUpdateGenderMutation,
} from '../../../service/apollo/generated';
import {useMe} from '../../../state/useMe';
import {FormItemEditorProps} from '../../formItem';

export const GenderEditor: FC<FormItemEditorProps> = ({closeModal}) => {
    const {me} = useMe();
    const [userUpdateGenderMutation] = useUserUpdateGenderMutation();

    const genderChangeHandler = (value: GenderType) => {
        userUpdateGenderMutation({
            variables: {
                userGenderInput: {
                    gender: value,
                },
            },
            optimisticResponse: {
                userUpdateGender: {
                    id: me.id,
                    gender: value,
                    __typename: 'User',
                },
            },
        });

        closeModal && closeModal();
    };

    return (
        <GenderChooser
            selectedGender={me.gender!}
            onGenderChange={genderChangeHandler}
        />
    );
};
