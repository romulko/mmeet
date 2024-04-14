import {Match} from './useMatches';
import {useEffect} from 'react';
import {atom, useRecoilValue} from 'recoil';
import {useMatchLazyQuery} from '../../../../../service/apollo/generated';
import {getPartner} from '../utils/match.utils';
import {useMe} from '../../../../../state/useMe';

export const useSelectedMatch = () => {
    const {me} = useMe();
    const selectedMatchId = useRecoilValue(selectedMatchIdState);
    const [getMatch, {loading, data}] = useMatchLazyQuery();

    useEffect(() => {
        if (!selectedMatchId) {
            return;
        }

        getMatch({
            variables: {input: {matchId: selectedMatchId}},
        });
    }, [getMatch, selectedMatchId]);

    const selectedMatch = data?.match;
    const partner = selectedMatch && getPartner(me, selectedMatch);

    return {
        selectedMatch,
        partner,
        loading,
    };
};

export const selectedMatchIdState = atom<Match['id'] | undefined>({
    key: 'selectedMatchId',
    default: undefined,
});
