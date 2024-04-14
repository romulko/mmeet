import {User} from '../../../service/apollo/generated';
import {RESOURCE_URL} from '../../../service/consts/consts';
import {Question} from '../../questions';

export const getMainVideoUri = (userId: User['id']) =>
    `${RESOURCE_URL}/${userId}/video/mainVideo.mp4`;

export const getVideoAnswerUri = (
    userId: User['id'],
    questionId: Question['id'],
) => `${RESOURCE_URL}/${userId}/video/answers/${questionId}.mp4`;
