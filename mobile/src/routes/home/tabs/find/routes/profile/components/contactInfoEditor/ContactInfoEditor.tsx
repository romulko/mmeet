import React, {FC} from 'react';
import {Label} from '../../../../../../../../components/label';
import {FormItemEditorProps} from '../../../../../../../../components/formItem';
import {useMe} from '../../../../../../../../state/useMe';
import {
    UserContactInfoInput,
    useUserUpdateContactInfoMutation,
} from '../../../../../../../../service/apollo/generated';
import {TextInput} from '../../../../../../../../components/textInput';
import {Spacer} from '../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

export const ContactInfoEditor: FC<FormItemEditorProps> = () => {
    const {t} = useTranslation();
    const {
        me: {id, contactInfo},
    } = useMe();
    const [userUpdateContactInfo] = useUserUpdateContactInfoMutation();

    const changeHandler = (value: string) => {
        const input: UserContactInfoInput = {
            contactInfo: value.trim(),
        };

        userUpdateContactInfo({
            variables: {
                input,
            },
            optimisticResponse: {
                userUpdateContactInfo: {
                    ...input,
                    id,
                    __typename: 'User',
                },
            },
        });
    };

    return (
        <>
            <Label variant="h4">
                {t('profile.editors.contactInfo.description')}
            </Label>

            <Spacer hVariant="h2" />

            <TextInput
                placeholder={t('profile.editors.contactInfo.placeholder')}
                onChangeText={changeHandler}
                value={contactInfo || ''}
            />
        </>
    );
};
