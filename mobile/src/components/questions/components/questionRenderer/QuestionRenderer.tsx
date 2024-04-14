import React, {FC} from 'react';
import {Container, ActionsContainer} from './Styles';
import {Alert, Pressable} from 'react-native';
import {Spacer} from '../../../spacer';
import {HOME_PROFILE_EDIT_VIDEO_WATCH_ANSWER} from '../../../../routes/routes';
import {Question} from '../../Questions';
import {useNavigation} from '@react-navigation/native';
import {useDeleteAnswer} from '../../hooks/useDeleteAnswer';
import {Label} from '../../../label';
import {PlayIcon} from './components/playIcon';
import {DeleteIcon} from './components/deleteIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {questionIdState} from '../../state/questionId.state';
import {recordProcesses} from '../../hooks/useRecordProcess';
import {userIdState} from '../../state/user.state';
import {useReactiveVar} from '@apollo/client';
import {useTranslation} from 'react-i18next';

interface Props {
    question: Question;
    selected?: boolean;
}

export const QuestionRenderer: FC<Props> = ({question, selected}) => {
    const {t} = useTranslation();
    const processes = useReactiveVar(recordProcesses);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {deleteAnswerVideo} = useDeleteAnswer();
    const setQuestionId = useSetRecoilState(questionIdState);
    const userId = useRecoilValue(userIdState);

    const playPressHandler = () => {
        setQuestionId(question.id);

        navigation.navigate(HOME_PROFILE_EDIT_VIDEO_WATCH_ANSWER);
    };

    const process = processes.find(
        value => value.questionId === question.id && value.userId === userId,
    );

    const deletePressHandler = () => {
        Alert.alert(
            t('videoStudio.alert.deleteAnswer.title'),
            t('videoStudio.alert.deleteAnswer.description'),
            [
                {
                    text: t('labels.alert.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('videoStudio.alert.deleteAnswer.confirm'),
                    onPress: () => deleteAnswerVideo(question.id),
                },
            ],
        );
    };

    return (
        <Container showBackground={selected}>
            <Label variant="h3" color={question.answer ? 'black' : 'gray'}>
                {question.text}
            </Label>

            {process && (
                <Label variant="h4" color="gray">
                    {t('videoStudio.processing')}
                </Label>
            )}

            {selected && !process && question.answer && (
                <ActionsContainer>
                    <Pressable onPress={playPressHandler}>
                        <PlayIcon />
                    </Pressable>

                    <Spacer wVariant="h2" />

                    <Pressable onPress={deletePressHandler}>
                        <DeleteIcon />
                    </Pressable>
                </ActionsContainer>
            )}
        </Container>
    );
};
