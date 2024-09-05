import {useCallback} from 'react';
import {useQuestionDeleteAnswerMutation} from '../../../service/apollo/generated';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {videoStartedProcessingState} from '../../../routes/home/tabs/find/routes/profile/routes/videoStudio/components/mainVideoButton/recoil/videoStartedProcessingState';
import {userIdState} from '../state/user.state';
import {useRecordProcess} from './useRecordProcess';

export const useDeleteAnswer = () => {
    const userId = useRecoilValue(userIdState);
    const [questionDeleteAnswerMutation] = useQuestionDeleteAnswerMutation();
    const setVideoStartedProcessingState = useSetRecoilState(
        videoStartedProcessingState,
    );
    const {deleteProcess} = useRecordProcess();

    const deleteAnswerVideo = useCallback(
        (questionId: number) => {
            questionDeleteAnswerMutation({
                variables: {input: {questionId, userId}},
                update: (cache, result) => {
                    const questionDeleteAnswer =
                        result.data?.questionDeleteAnswer;

                    if (!questionDeleteAnswer) {
                        return;
                    }

                    cache.evict({
                        id: cache.identify(questionDeleteAnswer),
                    });

                    cache.gc();

                    deleteProcess({
                        questionId: questionDeleteAnswer.questionId,
                        userId,
                    });

                    setVideoStartedProcessingState(true);
                },
            });
        },
        [
            deleteProcess,
            userId,
            setVideoStartedProcessingState,
            questionDeleteAnswerMutation,
        ],
    );

    return {deleteAnswerVideo};
};
