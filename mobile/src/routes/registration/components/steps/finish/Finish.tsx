import React from 'react';
import {Spacer} from '../../../../../components/spacer';
import {Label} from '../../../../../components/label';
import {useTranslation} from 'react-i18next';

export const Finish = () => {
    const {t} = useTranslation();

    return (
        <>
            <Label variant="h1">{t('registration.finish.title')}</Label>

            <Spacer hVariant="h3" />

            <Label variant="h3">{t('registration.finish.description')}</Label>
        </>
    );
};
