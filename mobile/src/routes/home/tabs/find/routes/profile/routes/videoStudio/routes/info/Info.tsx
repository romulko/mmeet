import {ScreenContainer} from '../../../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../../../components/screenHeader';
import {Label} from '../../../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

export const Info = () => {
    const {t} = useTranslation();

    return (
        <ScreenContainer>
            <ScreenHeader title={t('videoStudio.buttons.routes.info.title')} />

            <Spacer hVariant="h2" />

            <Label>{t('videoStudio.buttons.routes.info.description')}</Label>
        </ScreenContainer>
    );
};
