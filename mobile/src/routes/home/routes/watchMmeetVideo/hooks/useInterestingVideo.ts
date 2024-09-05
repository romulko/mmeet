import {useCallback} from 'react';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {useMe} from '../../../../../state/useMe';
import {useInterestingVideoMutation} from '../../../../../service/apollo/generated';
import {useSelectedMatch} from '../../../tabs/matches/state/useSelectedMatch';
import {getHisHer} from '../../../../../utils/user.utils';
import {getPartner} from '../../../tabs/matches/utils/match.utils';

export const useInterestingVideo = () => {
    const {me} = useMe();
    const {t} = useTranslation();
    const [interestingVideoMutation] = useInterestingVideoMutation();
    const {selectedMatch} = useSelectedMatch();

    const interestingVideo = useCallback(() => {
        if (!selectedMatch) {
            return;
        }

        interestingVideoMutation({
            variables: {
                input: {
                    matchId: selectedMatch.id,
                },
            },
        }).then(() =>
            showMessage({
                message: t('home.tabs.matches.likedVideo').replace(
                    '{heShe}',
                    getHisHer(getPartner(me, selectedMatch).gender!),
                ),
                type: 'success',
            }),
        );
    }, [t, me, selectedMatch, interestingVideoMutation]);

    return {interestingVideo};
};
