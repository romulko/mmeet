import React, {FC} from 'react';
import {Label} from '../../../../../../../../components/label';
import {FormItemEditorProps} from '../../../../../../../../components/formItem';
import {useMe} from '../../../../../../../../state/useMe';
import {
    UserLanguageInput,
    useUserUpdateLanguageMutation,
} from '../../../../../../../../service/apollo/generated';
import {
    languageToLabel,
    languageToLabelMap,
} from '../../../../../../../../utils/i18n.utils';
import {Pressable} from 'react-native';
import {Spacer} from '../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

export const LanguageEditor: FC<FormItemEditorProps> = ({closeModal}) => {
    const {
        me: {id, language},
    } = useMe();
    const [userUpdateLanguage] = useUserUpdateLanguageMutation();
    const {i18n} = useTranslation();

    const changeHandler = (value: string) => {
        i18n.changeLanguage(value);

        const input: UserLanguageInput = {
            language: value,
        };

        userUpdateLanguage({
            variables: {
                input,
            },
            optimisticResponse: {
                userUpdateLanguage: {
                    ...input,
                    id,
                    __typename: 'User',
                },
            },
        });

        closeModal && closeModal();
    };

    return (
        <>
            {languages.map(value => (
                <Pressable key={value} onPress={() => changeHandler(value)}>
                    <Label bold={value === language} variant="h2">
                        {languageToLabel(value)}
                    </Label>

                    <Spacer hVariant="h2" />
                </Pressable>
            ))}
        </>
    );
};

const languages = Object.keys(languageToLabelMap);
