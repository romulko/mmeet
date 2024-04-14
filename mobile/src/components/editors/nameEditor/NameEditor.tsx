import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    useMeLazyQuery,
    useUserUpdateNameMutation,
} from '../../../service/apollo/generated';
import {debounce} from 'lodash';
import {useMe} from '../../../state/useMe';
import {TextInput} from '../../textInput';

export const NameEditor = () => {
    // const {t} = useTranslation();
    const {me} = useMe();
    const [getMe] = useMeLazyQuery();
    const [userUpdateNameMutation] = useUserUpdateNameMutation();
    const [name, setName] = useState('');
    const textInputRef = useRef<any>();

    useEffect(() => {
        if (!textInputRef.current) {
            return;
        }

        textInputRef.current.focus();
    }, []);

    useEffect(() => {
        getMe().then(value => setName(value.data?.me?.name || ''));
    }, [getMe]);

    const debouncedSaveText = useMemo(
        () =>
            debounce((nameInput: string) => {
                userUpdateNameMutation({
                    variables: {userNameInput: {name: nameInput}},
                    optimisticResponse: {
                        userUpdateName: {
                            id: me.id,
                            name: nameInput,
                            __typename: 'User',
                        },
                    },
                });
            }, 500),
        [me, userUpdateNameMutation],
    );

    const textInputChangeTextHandler = (text: string) => {
        setName(text);
        debouncedSaveText(text);
    };

    return (
        <TextInput
            ref={(instance: any) => (textInputRef.current = instance)}
            // placeholder={t('profile.name')}
            onChangeText={textInputChangeTextHandler}
            value={name}
        />
    );
};
