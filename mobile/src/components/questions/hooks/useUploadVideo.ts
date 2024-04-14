import {useCallback} from 'react';
import {ReactNativeFile} from 'apollo-upload-client';
import {client} from '../../../service/apollo/client';
import {
    QuestionAnswerDocument,
    QuestionAnswerMutation,
    QuestionAnswerMutationVariables,
} from '../../../service/apollo/generated';
import {gql} from '@apollo/client';
import {handlerError} from '../../../service/errorHandler';
import {useRecordProcess} from './useRecordProcess';

export const useUploadVideo = () => {
    const {findProcess, deleteProcess} = useRecordProcess();

    const uploadVideo = useCallback(async () => {
        const process = findProcess();

        const name = `${process.videoFile.path.substring(
            process.videoFile.path.lastIndexOf('/') + 1,
            process.videoFile.path.length,
        )}.mp4`;

        try {
            const file = new ReactNativeFile({
                uri: process.videoFile.path,
                name,
                type: 'video/mp4',
            });

            client
                .mutate<
                    QuestionAnswerMutation,
                    QuestionAnswerMutationVariables
                >({
                    mutation: QuestionAnswerDocument,
                    variables: {
                        video: file,
                        input: {
                            userId: process.userId,
                            questionId: process.questionId,
                            duration: Math.round(process.videoFile.duration),
                        },
                    },
                    update: (cache, result) => {
                        const answer = result.data?.questionAnswer;

                        if (!answer) {
                            return;
                        }

                        cache.updateFragment(
                            {
                                id: `Question:${answer.questionId}`,
                                fragment: gql`
                                    fragment updateQuestion on Question {
                                        answer {
                                            id
                                            questionId
                                            duration
                                        }
                                    }
                                `,
                            },
                            data => ({
                                ...data,
                                answer: result.data?.questionAnswer,
                            }),
                        );
                    },
                })
                .then(() => {
                    deleteProcess({
                        questionId: process.questionId,
                        userId: process.userId,
                    });
                })
                .catch(console.error);
        } catch (e) {
            handlerError(e);
        }
    }, [deleteProcess, findProcess]);

    return {uploadVideo};
};
