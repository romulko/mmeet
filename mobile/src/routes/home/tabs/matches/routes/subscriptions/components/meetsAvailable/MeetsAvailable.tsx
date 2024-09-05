import {Box} from '../../../../../../../../components/box';
import {Label} from '../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../components/spacer';
import {Pressable} from 'react-native';
import React from 'react';
import {HOME_MATCHES_SUBSCRIPTIONS_INFO} from '../../../../../../../routes';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {LoadingLabel} from '../../../../../../../../components/loadingLabel';
import {InfoIcon} from './components/infoIcon';
import {useAvailableMeetingsInThisWeekQuery} from '../../../../../../../../service/apollo/generated';

export const MeetsAvailable = () => {
    const {t} = useTranslation();
    const {data, loading} = useAvailableMeetingsInThisWeekQuery();

    const navigation = useNavigation<any>();

    if (loading || !data?.availableMeetingsInThisWeek) {
        return <LoadingLabel />;
    }

    const infoPressHandler = () => {
        navigation.navigate(HOME_MATCHES_SUBSCRIPTIONS_INFO);
    };

    return (
        <Pressable onPress={infoPressHandler}>
            <Box>
                <Label>
                    {t('subscriptions.meetingsAvailable').replace(
                        '{mmeetsCount}',
                        data.availableMeetingsInThisWeek.count.toString(),
                    )}
                </Label>

                <Spacer wVariant="h4" />

                <InfoIcon />
            </Box>
        </Pressable>
    );
};
