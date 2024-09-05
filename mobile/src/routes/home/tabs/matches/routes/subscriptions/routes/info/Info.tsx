import {ScreenContainer} from '../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../components/screenHeader';
import {Label} from '../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';
import {useAvailableMeetingsPerWeekQuery} from '../../../../../../../../service/apollo/generated';
import {LoadingLabel} from '../../../../../../../../components/loadingLabel';

export const Info = () => {
    const {t} = useTranslation();
    const {data, loading} = useAvailableMeetingsPerWeekQuery();

    if (loading || !data?.availableMeetingsPerWeek) {
        return (
            <ScreenContainer>
                <LoadingLabel />
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <ScreenHeader title={t('subscriptions.info.title')} />

            <Spacer hVariant="h2" />

            <Label variant="h3">
                {t('subscriptions.info.desc1').replace(
                    '{count}',
                    data.availableMeetingsPerWeek.count.toString(),
                )}
            </Label>

            <Spacer hVariant="h2" />

            <Label variant="h3">{t('subscriptions.info.desc2')}</Label>

            <Spacer hVariant="h2" />

            <Label variant="h3">{t('subscriptions.info.desc3')}</Label>
        </ScreenContainer>
    );
};
