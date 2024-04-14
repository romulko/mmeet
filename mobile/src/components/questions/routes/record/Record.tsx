import React, {useRef, useState} from 'react';
import {ScreenHeader} from '../../../screenHeader';
import {ScreenContainer} from '../../../screenContainer';
import {StyleSheet, Text, Pressable} from 'react-native';
import {useGetPermissions} from './hooks/useGetPermissions';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-vision-camera';
import {VideoFile} from 'react-native-vision-camera/src/VideoFile';
import {HOME_PROFILE_EDIT_VIDEO_REVIEW} from '../../../../routes/routes';
import {Container as CenteredContainer} from '../../../container';
import {LoadingLabel} from '../../../loadingLabel';
import {
    ActionWrapper,
    BottomContainer,
    Container,
    IconWrapper,
    RecordButtonContainer,
} from './Styles';
import {RecordIndicator} from './components/recordIndicator';
import {RotateIcon} from './components/rotateIcon';
import {Spacer} from '../../../spacer';
import {Button} from '../../../button';
import {useSelectedQuestion} from '../../hooks/useSelectedQuestion';
import {TimeCounter} from './components/timeCounter';
import {useCameraDevice} from './hooks/useCameraDevice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {recordProcesses} from '../../hooks/useRecordProcess';
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../state/user.state';
import {stat} from 'react-native-fs';
import {Label} from '../../../label';

export const Record = () => {
    const {t} = useTranslation();
    const {permissionGotted} = useGetPermissions();
    const userId = useRecoilValue(userIdState);
    const {selectedQuestion} = useSelectedQuestion();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isRecording, setIsRecording] = useState(false);
    const camera = useRef<Camera>(null);
    const {cameraDevice, toggleCamera} = useCameraDevice();
    const canceledRef = useRef(false);

    if (!permissionGotted) {
        return (
            <ScreenContainer>
                <ScreenHeader />

                <Text>Need permissions...</Text>
            </ScreenContainer>
        );
    }

    if (!cameraDevice) {
        return (
            <CenteredContainer centered>
                <LoadingLabel />
            </CenteredContainer>
        );
    }

    const recordPressHandler = async () => {
        if (isRecording) {
            camera.current?.stopRecording();
        } else {
            setIsRecording(true);

            const recordingFinishedHandler = async (video: VideoFile) => {
                if (canceledRef.current || !selectedQuestion) {
                    return;
                }

                console.log(video.duration);

                const statResult = await stat(video.path);
                console.log(
                    `Video file size: ${statResult.size / 1000 / 1000}mb`,
                );

                recordProcesses([
                    ...recordProcesses(),
                    {
                        videoFile: video,
                        userId,
                        questionId: selectedQuestion.id,
                    },
                ]);

                navigation.navigate(HOME_PROFILE_EDIT_VIDEO_REVIEW);
            };

            camera.current?.startRecording({
                onRecordingError: console.log,
                onRecordingFinished: recordingFinishedHandler,
            });
        }
    };

    const backPressedHandler = () => {
        if (!isRecording) {
            return;
        }

        canceledRef.current = true;
        camera.current?.stopRecording();
    };

    const rotateIconPressHandler = () => {
        toggleCamera();
    };

    return (
        <Container>
            <Camera
                ref={camera}
                style={cameraStyle}
                device={cameraDevice}
                preset="iframe-960x540"
                videoStabilizationMode="cinematic"
                video
                audio
                isActive
            />

            <ScreenHeader positioned backPressed={backPressedHandler} />

            <IconWrapper>
                {isRecording && <RecordIndicator />}

                {!isRecording && (
                    <Pressable onPress={rotateIconPressHandler}>
                        <RotateIcon />
                    </Pressable>
                )}
            </IconWrapper>

            <BottomContainer>
                <Label variant="h3" color="white">
                    {selectedQuestion.questions
                        .map(value => value.text)
                        .join(' ')}
                </Label>

                <Spacer hVariant="h2" />

                <RecordButtonContainer>
                    {isRecording && (
                        <ActionWrapper>
                            <TimeCounter />
                        </ActionWrapper>
                    )}

                    <Button
                        title={
                            isRecording
                                ? t('videoStudio.buttons.finish')
                                : t('videoStudio.buttons.record')
                        }
                        onPress={recordPressHandler}
                    />

                    {isRecording && <ActionWrapper />}
                </RecordButtonContainer>
            </BottomContainer>
        </Container>
    );
};

// @ts-ignore
const cameraStyle = {...StyleSheet.absoluteFill, borderRadius: 16};

/*
iframe-1280x720
30 sec 17.6mb

iframe-960x540
30 sec 14.7mb
 */
