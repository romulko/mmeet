import React, {useState} from 'react';
import {ScreenContainer} from '../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../components/screenHeader';
import {Button} from '../../../../../../../../components/button';
import {useUserInviteFriendMutation} from '../../../../../../../../service/apollo/generated';
import {Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
    HOME_PROFILE_INVITE_FRIEND_STATISTIC,
    HOME_PROFILE_INVITE_FRIEND_INFO,
    HOME_PROFILE_INVITE_FRIEND_QUESTIONS,
} from '../../../../../../../routes';
import {useSetRecoilState} from 'recoil';
import {Spacer} from '../../../../../../../../components/spacer';
import validator from 'validator';
import {Label} from '../../../../../../../../components/label';
import {TextInput} from '../../../../../../../../components/textInput';
import {useTranslation} from 'react-i18next';
import {InviteFriendState} from './state/inviteFriend.state';
import {InfoIcon} from '../../../../../matches/routes/subscriptions/components/meetsAvailable/components/infoIcon';

export const InviteFriend = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState<string | undefined>();
    const [userInviteFriendMutation, {loading}] = useUserInviteFriendMutation();
    const setInviteUserState = useSetRecoilState(InviteFriendState);

    const textInputChangeTextHandler = (value: string) => {
        setEmail(value);
    };

    const nextPressHandler = () => {
        if (!email) {
            return;
        }

        userInviteFriendMutation({
            variables: {
                input: {email},
            },
        })
            .then(({data}) => {
                if (!data?.userInviteFriend) {
                    return;
                }

                setInviteUserState(data?.userInviteFriend);

                navigation.replace(HOME_PROFILE_INVITE_FRIEND_QUESTIONS);
            })
            .catch(reason => Alert.alert('Oh no', reason.message));
    };

    const statisticPressHandler = () => {
        navigation.navigate(HOME_PROFILE_INVITE_FRIEND_STATISTIC);
    };

    const infoPressHandler = () => {
        navigation.navigate(HOME_PROFILE_INVITE_FRIEND_INFO);
    };

    return (
        <ScreenContainer>
            <ScreenHeader
                title={t('inviteFriend.title')}
                rightContent={
                    <Pressable onPress={infoPressHandler}>
                        <InfoIcon />
                    </Pressable>
                }
            />

            <Spacer hVariant="h2" />

            <TextInput
                placeholder={t('labels.email')}
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={textInputChangeTextHandler}
                value={email}
            />

            <Spacer hVariant="h2" />

            <Button
                title={t('labels.next')}
                loading={loading}
                disabled={!email || !validator.isEmail(email)}
                onPress={nextPressHandler}
            />

            <Spacer hVariant="h2" />

            <Label color="gray" variant="h4">
                {t('inviteFriend.subText')}
            </Label>

            <Spacer hVariant="h1" />

            <Pressable onPress={statisticPressHandler}>
                <Label>
                    {t('inviteFriend.routes.statistic.title')} {'>'}
                </Label>
            </Pressable>
        </ScreenContainer>
    );
};
