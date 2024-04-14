import React, {FC} from 'react';
import {
    UserCityInput,
    useUserUpdateCityMutation,
} from '../../../service/apollo/generated';
import {LoadingLabel} from '../../loadingLabel';
import {Autocomplete} from '../../autocomplete';
import {useMe} from '../../../state/useMe';
import {FormItemEditorProps} from '../../formItem';

export const CityEditor: FC<FormItemEditorProps> = ({closeModal}) => {
    const {me} = useMe();
    const [userUpdateCityMutation, {loading}] = useUserUpdateCityMutation();

    const autocompleteSelectedHandler = (placeId: string, city: string) => {
        const userCityInput: UserCityInput = {cityId: placeId, cityLabel: city};

        userUpdateCityMutation({
            variables: {input: userCityInput},
            optimisticResponse: {
                userUpdateCity: {
                    ...userCityInput,
                    id: me.id,
                    __typename: 'User',
                },
            },
        });

        closeModal && closeModal();
    };

    if (loading) {
        return <LoadingLabel />;
    }

    return (
        <Autocomplete
            placeholder={me.cityLabel}
            onSelected={autocompleteSelectedHandler}
            type="(cities)"
        />
    );
};
