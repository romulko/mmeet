import {Label} from '../../../../../components/label';
import {Spacer} from '../../../../../components/spacer';
import {InterestingInEditor} from '../../../../../components/editors/interestingInEditor';
import React from 'react';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {useTranslation} from 'react-i18next';

export const ShowMe = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    useUpdateEnabled(!!me.lookingFor);

    return (
        <>
            <Label color="gray">{t('findOptions.interestingIn')}</Label>

            <Spacer hVariant="h2" />

            <InterestingInEditor />
        </>
    );
};
