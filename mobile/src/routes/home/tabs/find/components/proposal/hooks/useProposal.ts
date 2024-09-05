import {
    ProposalWatcherQuery,
    useFindPeopleLazyQuery,
    useInterestingPhotoMutation,
    useSkipPhotoMutation,
} from '../../../../../../../service/apollo/generated';
import {useCallback, useEffect, useState} from 'react';
import {gql, useApolloClient} from '@apollo/client';
import {useMe} from '../../../../../../../state/useMe';

export const useProposal = () => {
    const {me} = useMe();
    const [
        findPeople,
        {data: findPeopleData, loading: findPeopleLoading, called},
    ] = useFindPeopleLazyQuery();
    const [interestingPhotoMutation, {loading: interestingPhotoLoading}] =
        useInterestingPhotoMutation();
    const [skipPhotoMutation, {loading: skipPhotoLoading}] =
        useSkipPhotoMutation();
    const apolloClient = useApolloClient();
    const [currentProposalIndex, setCurrentProposalIndex] = useState<
        number | null
    >(null);

    const fetchProposals = useCallback(() => {
        setCurrentProposalIndex(null);

        const {fromAge, toAge} = ageRangeToDates(
            new Date(me.birthday),
            me.ageRange!,
        );

        findPeople({
            variables: {
                input: {
                    userId: me.id,
                    cityId: me.cityId!,
                    lookingFor: me.lookingFor!,
                    zodiacSigns: me.zodiacSigns,
                    fromAge,
                    toAge,
                },
            },
            fetchPolicy: 'network-only',
        }).then(value => {
            setCurrentProposalIndex(!value.data?.findPeople.length ? null : 0);
        });
    }, [me, findPeople]);

    // fetch at startup
    useEffect(() => {
        if (called) {
            return;
        }

        fetchProposals();
    }, [called, fetchProposals]);

    // refetch if user updated
    useEffect(() => {
        apolloClient
            .watchQuery<ProposalWatcherQuery>({
                query: gql`
                    query proposalWatcher {
                        me {
                            id
                            zodiacSigns
                            lookingFor
                            cityId
                            ageRange
                        }
                    }
                `,
                fetchPolicy: 'cache-only',
            })
            .subscribe(fetchProposals);
    }, [apolloClient, fetchProposals]);

    const getProposal = useCallback(() => {
        if (
            currentProposalIndex === null ||
            !findPeopleData?.findPeople?.length
        ) {
            return null;
        }

        return findPeopleData.findPeople[currentProposalIndex];
    }, [currentProposalIndex, findPeopleData]);

    const skip = useCallback(async () => {
        const proposal = getProposal();

        if (!proposal) {
            return;
        }

        await skipPhotoMutation({
            variables: {input: {skipUserId: proposal.id}},
        });

        setCurrentProposalIndex(prevState => prevState! + 1);
    }, [getProposal, skipPhotoMutation]);

    const like = useCallback(async () => {
        const proposal = getProposal();

        if (!proposal) {
            return;
        }

        await interestingPhotoMutation({
            variables: {input: {interestingUserId: proposal.id}},
        });

        setCurrentProposalIndex(prevState => prevState! + 1);
    }, [getProposal, interestingPhotoMutation]);

    return {
        fetchProposals,
        proposal: getProposal(),
        skip,
        like,
        loading:
            findPeopleLoading || skipPhotoLoading || interestingPhotoLoading,
    };
};

const ageRangeToDates = (birthday: Date, ageRange: string) => {
    const split = ageRange!.split('-');
    const now = new Date();
    const nowYear = now.getFullYear(); // 2020
    const ageRangeFrom = parseInt(split[0], 10); // 20
    const ageRangeTo = parseInt(split[1], 10); // 30
    const fromYears = nowYear - ageRangeTo; // 2020 - 30 = 1990
    const toYears = nowYear - ageRangeFrom; // 2020 - 20 = 2000
    const fromAge = new Date(fromYears, birthday.getMonth(), 0);
    const toAge = new Date(toYears, birthday.getMonth(), 31);

    return {fromAge, toAge};
};
