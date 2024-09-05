import React, {FC, useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {QuestionsQuery, User} from '../../service/apollo/generated';
import {QuestionRenderer} from './components/questionRenderer';
import {LoadingLabel} from '../loadingLabel';
import {useSetRecoilState} from 'recoil';
import {userIdState} from './state/user.state';
import {useQuestions} from './hooks/useQuestions';
import {questionIdState} from './state/questionId.state';
import {useReactiveVar} from '@apollo/client';
import {recordProcesses} from './hooks/useRecordProcess';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HOME_PROFILE_EDIT_VIDEO_RECORD} from '../../routes/routes';

export type Question = QuestionsQuery['questions'][0];

interface Props {
    userId: User['id'];
}

export const Questions: FC<Props> = ({userId}) => {
    const setQuestionsUserId = useSetRecoilState(questionIdState);
    const setUserId = useSetRecoilState(userIdState);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const {questions} = useQuestions();
    const processes = useReactiveVar(recordProcesses);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        setUserId(userId);
    }, [setUserId, userId]);

    if (!questions) {
        return <LoadingLabel />;
    }

    const questionPressHandler = (question: Question) => {
        setQuestionsUserId(question.id);
        setSelectedQuestionIndex(questions.indexOf(question));

        // go to record if there's no processing or answer
        const process = processes.find(
            value =>
                value.questionId === question.id && value.userId === userId,
        );

        if (question.answer || process) {
            return;
        }

        navigation.navigate(HOME_PROFILE_EDIT_VIDEO_RECORD);
    };

    return (
        <>
            {questions.map(value => (
                <Pressable
                    key={value.id}
                    onPress={() => questionPressHandler(value)}>
                    <QuestionRenderer
                        question={value}
                        selected={
                            selectedQuestionIndex === questions.indexOf(value)
                        }
                    />
                </Pressable>
            ))}
        </>
    );
};
