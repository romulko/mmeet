import {Label} from '../../../../../components/label';
import {Spacer} from '../../../../../components/spacer';
import {GenderEditor} from '../../../../../components/editors/genderEditor';
import React from 'react';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {useTranslation} from 'react-i18next';

export const Im = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    useUpdateEnabled(!!me.gender);

    return (
        <>
            <Label color="gray">{t('profile.gender')}</Label>

            <Spacer hVariant="h2" />

            <GenderEditor />
        </>
    );
};
