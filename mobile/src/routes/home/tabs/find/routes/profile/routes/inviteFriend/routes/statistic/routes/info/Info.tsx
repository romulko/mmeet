import {ScreenContainer} from '../../../../../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../../../../../components/screenHeader';
import {Label} from '../../../../../../../../../../../../components/label';
import {useTranslation} from 'react-i18next';

export const Info = () => {
    const {t} = useTranslation();

    return (
        <ScreenContainer>
            <ScreenHeader />

            <Label>
                {t('inviteFriend.routes.statistic.routes.info.description')}
            </Label>
        </ScreenContainer>
    );
};
