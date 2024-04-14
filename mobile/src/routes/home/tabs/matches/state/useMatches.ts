import {
    MatchesQuery,
    useMatchesQuery,
} from '../../../../../service/apollo/generated';

export type Match = MatchesQuery['matches'][0];

export const useMatches = () => {
    const {loading, data} = useMatchesQuery();

    return {loading, matches: data?.matches};
};
