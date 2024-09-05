import React from 'react';
import {ScreenContainer} from '../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../components/screenHeader';
import {Spacer} from '../../../../../../components/spacer';
import {useMe} from '../../../../../../state/useMe';
import {FormItem} from '../../../../../../components/formItem';
import {InterestingInEditor} from '../../../../../../components/editors/interestingInEditor';
import {AgeRangeEditor} from './components/editors/ageRangeEditor';
import {ZodiacSignsEditor} from './components/editors/zodiacSignsEditor';
import {CityEditor} from '../../../../../../components/editors/cityEditor';
import {useGetSelectedZodiacs} from './hooks/useGetSelectedZodiacs';
import {useTranslation} from 'react-i18next';

export const FindOptions = () => {
    const {t} = useTranslation();
    const {
        me: {lookingFor, ageRange, cityLabel},
    } = useMe();
    const {selectedZodiacs} = useGetSelectedZodiacs();

    return (
        <ScreenContainer useScrollable>
            <ScreenHeader title={t('findOptions.title')} />

            <Spacer hVariant="h1" />

            <FormItem
                label={t('findOptions.interestingIn')}
                value={t(`labels.gender.${lookingFor?.toLowerCase()}`)}
                editor={closeModal => (
                    <InterestingInEditor closeModal={closeModal} />
                )}
            />

            <Spacer hVariant="h1" />

            <FormItem
                label={t('findOptions.city')}
                value={cityLabel}
                editor={closeModal => <CityEditor closeModal={closeModal} />}
            />

            <Spacer hVariant="h1" />

            <FormItem
                label={t('findOptions.zodiacSigns.label')}
                value={selectedZodiacs}
                editor={() => <ZodiacSignsEditor />}
            />

            <Spacer hVariant="h1" />

            <FormItem
                label={t('findOptions.ageRange.label')}
                value={t('findOptions.ageRange.yearsOld').replace(
                    '{ageRange}',
                    `${ageRange}`,
                )}
                editor={() => <AgeRangeEditor />}
            />
        </ScreenContainer>
    );
};
