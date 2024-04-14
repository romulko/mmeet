import React from 'react';
import {ScreenContainer} from '../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../components/screenHeader';
import {Spacer} from '../../../../../../../../components/spacer';
import {Questions} from '../../../../../../../../components/questions';
import {MainVideoButton} from './components/mainVideoButton';
import {useMe} from '../../../../../../../../state/useMe';
import {useTranslation} from 'react-i18next';
import {InfoIcon} from '../../../../../matches/routes/subscriptions/components/meetsAvailable/components/infoIcon';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HOME_PROFILE_MY_VIDEOS_INFO} from '../../../../../../../routes';

export const VideoStudio = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const navigation = useNavigation<any>();

    const infoPressHandler = () => {
        navigation.navigate(HOME_PROFILE_MY_VIDEOS_INFO);
    };

    return (
        <ScreenContainer useScrollable>
            <ScreenHeader
                title={t('videoStudio.title')}
                rightContent={
                    <Pressable onPress={infoPressHandler}>
                        <InfoIcon />
                    </Pressable>
                }
            />

            <Spacer hVariant="h2" />

            <MainVideoButton />

            <Spacer hVariant="h2" />

            <Questions userId={me.id} />

            <Spacer hVariant="h1" />
        </ScreenContainer>
    );
};
