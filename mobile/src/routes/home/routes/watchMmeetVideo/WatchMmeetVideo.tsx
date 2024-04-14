import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {
    ActionsWrapper,
    Container,
    LoadingLabelWrapper,
    QuestionTextWrapper,
} from './Styles';
import {ActivityIndicator, Pressable} from 'react-native';
import {OnProgressData} from 'react-native-video';
import {LoadingLabel} from '../../../../components/loadingLabel';
import {VideoPlayer} from '../../../../components/videoPlayer';
import {getMainVideoUri} from '../../../../components/videoPlayer/utils/videoPlayer.utils';
import {ScreenHeader} from '../../../../components/screenHeader';
import {Label} from '../../../../components/label';
import {useGetQuestionTextByTime} from './hooks/useGetQuestionTextByTime';
import {useRoute} from '@react-navigation/native';
import {SkipButton} from '../../tabs/find/components/proposal/components/skipButton';
import {LikeButton} from '../../tabs/find/components/proposal/components/likeButton';
import {useInterestingVideo} from './hooks/useInterestingVideo';
import {useSkipVideo} from './hooks/useSkipVideo';
import {Spacer} from '../../../../components/spacer';

export const WatchMmeetVideo = () => {
    const {t} = useTranslation();
    const [text, setText] = useState('');
    const {
        params: {userId, showActions},
    } = useRoute<any>();
    const {interestingVideo} = useInterestingVideo();
    const {skipVideo} = useSkipVideo();

    const {getQuestionText, loading} = useGetQuestionTextByTime(userId);

    if (loading) {
        return (
            <Container>
                <LoadingLabelWrapper>
                    <ActivityIndicator size="large" />
                </LoadingLabelWrapper>
            </Container>
        );
    }

    const videoProgressHandler = (data: OnProgressData) => {
        setText(getQuestionText(Math.round(data.currentTime)));
    };

    return (
        <Container>
            <LoadingLabelWrapper>
                <LoadingLabel label={t('labels.loadingVideo')} />
            </LoadingLabelWrapper>

            <VideoPlayer
                uri={getMainVideoUri(userId)}
                onProgress={videoProgressHandler}
            />

            <ScreenHeader positioned />

            <QuestionTextWrapper>
                {text && (
                    <>
                        <Label variant="h3" color="white">
                            {text}
                        </Label>

                        {showActions && <Spacer hVariant="h2" />}
                    </>
                )}

                {showActions && (
                    <ActionsWrapper>
                        <Pressable onPress={skipVideo}>
                            <SkipButton />
                        </Pressable>

                        <Pressable onPress={interestingVideo}>
                            <LikeButton />
                        </Pressable>
                    </ActionsWrapper>
                )}
            </QuestionTextWrapper>
        </Container>
    );
};
