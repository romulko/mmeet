import React from 'react';
import {BottomContainer, Container, UploadButtonContainer} from './Styles';
import {ScreenHeader} from '../../../screenHeader';
import {VideoPlayer} from '../../../videoPlayer';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRecordProcess} from '../../hooks/useRecordProcess';
import {useTranslation} from 'react-i18next';
import {useUploadVideo} from '../../hooks/useUploadVideo';

export const Review = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {findProcess, cancelProcess} = useRecordProcess();
    const {uploadVideo} = useUploadVideo();

    const uploadPressHandler = () => {
        uploadVideo();

        navigation.goBack();
        navigation.goBack();
    };

    const backPressedHandler = () => {
        cancelProcess();

        navigation.goBack();
    };

    const process = findProcess();

    return (
        <Container>
            <VideoPlayer uri={process.videoFile.path} />

            <ScreenHeader positioned backPressed={backPressedHandler} />

            <BottomContainer>
                <UploadButtonContainer>
                    <Button
                        title={t('videoStudio.buttons.upload')}
                        onPress={uploadPressHandler}
                    />
                </UploadButtonContainer>
            </BottomContainer>
        </Container>
    );
};
