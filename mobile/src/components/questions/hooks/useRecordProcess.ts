import {useRecoilValue} from 'recoil';
import {useCallback} from 'react';
import {userIdState} from '../state/user.state';
import {questionIdState} from '../state/questionId.state';
import {makeVar} from '@apollo/client';
import {Question, User} from '../../../service/apollo/generated';

type RecordProcessId = Pick<RecordProcess, 'userId' | 'questionId'>;

interface VideoFile {
    path: string;
    duration: number;
}

export interface RecordProcess {
    questionId: Question['id'];
    userId: User['id'];
    videoFile: VideoFile;
}

export const recordProcesses = makeVar<RecordProcess[]>([]);

export const useRecordProcess = () => {
    const userId = useRecoilValue(userIdState);
    const questionId = useRecoilValue(questionIdState);

    const findProcess = useCallback(
        () =>
            recordProcesses().find(
                value =>
                    value.questionId === questionId && value.userId === userId,
            )!,
        [questionId, userId],
    );

    const findProcessById = useCallback(
        (recordProcessId: RecordProcessId) =>
            recordProcesses().find(
                value =>
                    value.questionId === recordProcessId.questionId &&
                    value.userId === recordProcessId.userId,
            )!,
        [],
    );

    const cancelProcess = useCallback(() => {
        recordProcesses(
            recordProcesses().filter(
                value =>
                    value.questionId !== questionId && value.userId !== userId,
            ),
        );
    }, [questionId, userId]);

    const deleteProcess = useCallback((recordProcessId: RecordProcessId) => {
        recordProcesses(
            recordProcesses().filter(
                value =>
                    value.questionId !== recordProcessId.questionId &&
                    value.userId !== recordProcessId.userId,
            ),
        );
    }, []);

    return {
        findProcess,
        findProcessById,
        cancelProcess,
        deleteProcess,
    };
};
