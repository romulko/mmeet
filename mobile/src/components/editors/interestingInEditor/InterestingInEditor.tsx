import React, {FC} from 'react';
import {GenderChooser} from '../../genderChooser';
import {
    GenderType,
    UserLookingForInput,
    useUserUpdateLookingForMutation,
} from '../../../service/apollo/generated';
import {useMe} from '../../../state/useMe';
import {FormItemEditorProps} from '../../formItem';

export const InterestingInEditor: FC<FormItemEditorProps> = ({closeModal}) => {
    const {me} = useMe();
    const [userUpdateLookingForMutation] = useUserUpdateLookingForMutation();

    const genderChangeHandler = (value: GenderType) => {
        const userLookingForInput: UserLookingForInput = {lookingFor: value};

        userUpdateLookingForMutation({
            variables: {
                userLookingForInput,
            },
            optimisticResponse: {
                userUpdateLookingFor: {
                    ...userLookingForInput,
                    id: me.id,
                    __typename: 'User',
                },
            },
        });

        closeModal && closeModal();
    };

    return (
        <GenderChooser
            selectedGender={me.lookingFor!}
            onGenderChange={genderChangeHandler}
        />
    );
};
