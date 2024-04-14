import React from 'react';
import {Container, LoadingLabelWrapper} from './Styles';
import {ScreenHeader} from '../../../screenHeader';
import {VideoPlayer} from '../../../videoPlayer';
import {LoadingLabel} from '../../../loadingLabel';
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../state/user.state';
import {questionIdState} from '../../state/questionId.state';
import {useTranslation} from 'react-i18next';
import {getVideoAnswerUri} from '../../../videoPlayer/utils/videoPlayer.utils';

export const WatchAnswer = () => {
    const {t} = useTranslation();
    const userId = useRecoilValue(userIdState);
    const questionId = useRecoilValue(questionIdState);

    return (
        <Container>
            <LoadingLabelWrapper>
                <LoadingLabel label={t('labels.loadingVideo')} />
            </LoadingLabelWrapper>

            <VideoPlayer uri={getVideoAnswerUri(userId!, questionId)} />

            <ScreenHeader positioned />
        </Container>
    );
};
