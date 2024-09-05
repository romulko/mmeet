import {useEffect, useState} from 'react';
import {useQuestionsQuery} from '../../../../../service/apollo/generated';

export const useGetQuestionTextByTime = (userId: number) => {
    const [texts, setTexts] = useState<string[]>([]);
    const {data, loading} = useQuestionsQuery({
        variables: {input: {userId}},
    });

    useEffect(() => {
        if (!data) {
            return;
        }

        const result: string[] = [];

        data.questions.forEach(question => {
            const answer = question.answer;

            if (!answer) {
                return;
            }

            let i = 0;
            while (i < answer.duration) {
                result.push(
                    question.questions.map(value => value.text).join(' '),
                );
                i++;
            }
        });

        setTexts(result);
    }, [data]);

    const getQuestionText = (time: number) => {
        return texts[Math.round(time)];
    };

    return {getQuestionText, loading};
};
