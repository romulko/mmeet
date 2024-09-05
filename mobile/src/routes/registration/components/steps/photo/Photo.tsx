import React from 'react';
import {Avatar} from '../../../../../components/avatar';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {Label} from '../../../../../components/label';
import {Spacer} from '../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

export const Photo = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    useUpdateEnabled(me.isPhotoAvailable);

    return (
        <>
            <Label color="gray">{t('registration.photo')}</Label>

            <Spacer hVariant="h2" />

            <Avatar allowEdit variant="big" usePreloader={false} />
        </>
    );
};
