import {useQuestionsQuery} from '../../../../../../../../../../../service/apollo/generated';
import {useEffect, useState} from 'react';
import {useMe} from '../../../../../../../../../../../state/useMe';

export const useCheckIfHasAnswer = () => {
    const {me} = useMe();
    const {data} = useQuestionsQuery({variables: {input: {userId: me.id}}});
    const [isAnswerPresent, setIsAnswerPresent] = useState(false);

    useEffect(() => {
        if (!data?.questions.length) {
            return;
        }

        setIsAnswerPresent(!!data.questions.find(value => !!value.answer));
    }, [data]);

    return {isAnswerPresent};
};
