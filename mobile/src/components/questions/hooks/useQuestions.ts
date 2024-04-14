import {useRecoilValue} from 'recoil';
import {useQuestionsLazyQuery} from '../../../service/apollo/generated';
import {useEffect} from 'react';
import {userIdState} from '../state/user.state';
import {gql, useApolloClient} from '@apollo/client';

/**
 * Get questions for user by userId.
 *
 * Refetch questions if language was changed.
 */
export const useQuestions = () => {
    const userId = useRecoilValue(userIdState);
    const [fetchQuestions, {data}] = useQuestionsLazyQuery();
    const apolloClient = useApolloClient();

    // Refetch questions if language was changed
    useEffect(() => {
        apolloClient
            .watchQuery({
                query: gql`
                    query languageWatcher {
                        me {
                            language
                        }
                    }
                `,
                fetchPolicy: 'cache-only',
            })
            .subscribe(() => {
                if (!userId) {
                    return;
                }

                fetchQuestions({
                    variables: {input: {userId}},
                    fetchPolicy: 'network-only',
                });
            });
    }, [userId, apolloClient, fetchQuestions]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        fetchQuestions({variables: {input: {userId}}});
    }, [fetchQuestions, userId]);

    return {questions: data?.questions};
};
