import React from 'react';
import {ScreenContainer} from '../../../../../../components/screenContainer';
import {Label} from '../../../../../../components/label';
import {useTranslation} from 'react-i18next';
import {LoadingLabel} from '../../../../../../components/loadingLabel';
import {useReactiveVar} from '@apollo/client';
import {
    buySubscription,
    IS_IAP_INITIALIZED,
} from '../../../../../../service/iap';
import {ScreenContainerNew} from '../../../../../../components/screenContainerNew/ScreenContainerNew';
import {Box} from '../../../../../../components/box';
import {GreenIcon} from '../details/components/greenIcon';
import {Spacer} from '../../../../../../components/spacer';
import {SubscriptionsContainer, Title} from './Styles';
import {Subscription} from './components/subscription';
import {Pressable} from 'react-native';
import {MeetsAvailable} from './components/meetsAvailable';

export const Subscriptions = () => {
    const {t} = useTranslation();
    const isIapInitialized = useReactiveVar(IS_IAP_INITIALIZED);

    if (!isIapInitialized) {
        return (
            <ScreenContainer>
                <LoadingLabel />
            </ScreenContainer>
        );
    }

    const subscribePressHandler = (month: number) => {
        buySubscription(month);
    };

    return (
        <ScreenContainerNew>
            <MeetsAvailable />

            <Spacer hVariant="h1" />
            <Spacer hVariant="h1" />

            <Title>{t('subscriptions.title')}</Title>

            <Spacer hVariant="h3" />

            <Box alignItems="center">
                <GreenIcon />

                <Spacer wVariant="h4" />

                <Label>{t('subscriptions.promotions.p1')}</Label>
            </Box>

            <Spacer hVariant="h3" />

            <Box alignItems="center">
                <GreenIcon />

                <Spacer wVariant="h4" />

                <Label>{t('subscriptions.promotions.p2')}</Label>
            </Box>

            <Spacer hVariant="h1" />

            <SubscriptionsContainer>
                <Pressable onPress={() => subscribePressHandler(12)}>
                    <Subscription count={12} price={4.99} />
                </Pressable>

                <Pressable onPress={() => subscribePressHandler(6)}>
                    <Subscription count={6} price={6.99} />
                </Pressable>

                <Pressable onPress={() => subscribePressHandler(1)}>
                    <Subscription count={1} price={8.99} />
                </Pressable>
            </SubscriptionsContainer>
        </ScreenContainerNew>
    );
};
