import React from 'react';
import {HOME_WATCH_MMEET_VIDEO} from '../../../../../../../../../routes';
import {useNavigation} from '@react-navigation/native';
import {useCheckIfHasAnswer} from './hooks/useCheckIfHasAnswer';
import {Label} from '../../../../../../../../../../components/label';
import {Button} from '../../../../../../../../../../components/button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCheckServerHasProcessing} from './hooks/useCheckServerHasProcessing';
import {ActivityIndicator} from 'react-native';
import {Spacer} from '../../../../../../../../../../components/spacer';
import {HBox} from './Styles';
import {useTranslation} from 'react-i18next';
import {useMe} from '../../../../../../../../../../state/useMe';

export const MainVideoButton = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {serverHasProcessing} = useCheckServerHasProcessing();
    const {isAnswerPresent} = useCheckIfHasAnswer();

    const mainVideoPressHandler = () => {
        navigation.navigate(HOME_WATCH_MMEET_VIDEO, {userId: me.id});
    };

    const getStatus = () => {
        if (serverHasProcessing) {
            return (
                <HBox>
                    <ActivityIndicator />

                    <Spacer wVariant="h3" />

                    <Label variant="h4" color="gray">
                        {t('videoStudio.buttons.mainVideo.states.processing')}
                    </Label>
                </HBox>
            );
        }

        if (isAnswerPresent) {
            return <></>;
        }

        return (
            <Label variant="h4" color="gray">
                {t('videoStudio.buttons.mainVideo.states.noVideos')}
            </Label>
        );
    };

    return (
        <>
            <Button
                title={t('videoStudio.buttons.mainVideo.label')}
                disabled={!isAnswerPresent}
                onPress={mainVideoPressHandler}
            />

            <Spacer hVariant="h3" />

            {getStatus()}
        </>
    );
};
