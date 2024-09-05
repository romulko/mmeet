import {ScreenContainer} from '../../../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../../../components/screenHeader';
import {InfoIcon} from '../../../../../../../matches/routes/subscriptions/components/meetsAvailable/components/infoIcon';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HOME_PROFILE_INVITE_FRIEND_STATISTIC_INFO} from '../../../../../../../../../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMe} from '../../../../../../../../../../state/useMe';
import React from 'react';
import {Label} from '../../../../../../../../../../components/label';
import {Box, Image, ImageInvited} from './Styles';
import {RESOURCE_URL} from '../../../../../../../../../../service/consts/consts';
import {useRecoilValue} from 'recoil';
import {userImageLastChangeDateState} from '../../../../../../state/userImageLastChangeDate.state';
import {Spacer} from '../../../../../../../../../../components/spacer';
import {useInviteFriendStatisticQuery} from '../../../../../../../../../../service/apollo/generated';
import {LoadingLabel} from '../../../../../../../../../../components/loadingLabel';
import {ArrowDownIcon} from './components/arrowDownIcon';
import {useTranslation} from 'react-i18next';

export const Statistic = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const {data, loading} = useInviteFriendStatisticQuery();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const userImageLastChangeDate = useRecoilValue(
        userImageLastChangeDateState,
    );

    const infoPressHandler = () => {
        navigation.navigate(HOME_PROFILE_INVITE_FRIEND_STATISTIC_INFO);
    };

    if (loading) {
        return (
            <ScreenContainer>
                <LoadingLabel />
            </ScreenContainer>
        );
    }

    const invitedUsers = data?.inviteFriendStatistic?.invitedUsers;

    if (!invitedUsers?.length) {
        return (
            <ScreenContainer>
                <ScreenHeader
                    title={t('inviteFriend.routes.statistic.title')}
                    rightContent={
                        <Pressable onPress={infoPressHandler}>
                            <InfoIcon />
                        </Pressable>
                    }
                />

                <Spacer hVariant="h2" />

                <Label>{t('inviteFriend.routes.statistic.noData')}</Label>
            </ScreenContainer>
        );
    }

    const invitedByFriends = invitedUsers
        .map(value => value.invitedCount)
        .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
        );
    const meetingsCount = invitedUsers
        .map(value => value.meetingsCount)
        .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
        );

    return (
        <ScreenContainer useScrollable>
            <ScreenHeader
                title={t('inviteFriend.routes.statistic.title')}
                rightContent={
                    <Pressable onPress={infoPressHandler}>
                        <InfoIcon />
                    </Pressable>
                }
            />

            <Spacer hVariant="h2" />

            <Box>
                <Image
                    source={{
                        uri: `${RESOURCE_URL}/${me.id}/photo.jpeg?hash=${userImageLastChangeDate}`,
                    }}
                />
                <Label>{me.name}</Label>

                <Label>запрошені друзі {invitedUsers.length}</Label>
                <Label>запрошені друзями {invitedByFriends}</Label>
                <Label>зустрічі завдяки вам {meetingsCount}</Label>
            </Box>

            <Spacer hVariant="h2" />

            <Box>
                <ArrowDownIcon />
            </Box>

            <Spacer hVariant="h1" />

            {invitedUsers.map(value => (
                <Box key={value.id}>
                    <ImageInvited
                        source={{
                            uri: `${RESOURCE_URL}/${value.id}/photo.jpeg`,
                        }}
                    />
                    <Label>{value.name}</Label>

                    <Label>запрошені люди {value.invitedCount}</Label>
                    <Label>зустрічі {value.meetingsCount}</Label>

                    <Spacer hVariant="h1" />
                </Box>
            ))}
        </ScreenContainer>
    );
};
