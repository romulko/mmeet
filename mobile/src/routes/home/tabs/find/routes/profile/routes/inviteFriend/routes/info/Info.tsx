import {ScreenContainer} from '../../../../../../../../../../components/screenContainer';
import {Label} from '../../../../../../../../../../components/label';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScreenHeader} from '../../../../../../../../../../components/screenHeader';

export const Info = () => {
    const {t} = useTranslation();

    return (
        <ScreenContainer>
            <ScreenHeader />

            <Label variant="h3">{t('inviteFriend.description')}</Label>
        </ScreenContainer>
    );
};
