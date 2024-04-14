import {useCallback} from 'react';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {useMe} from '../../../../../state/useMe';
import {useSkipVideoMutation} from '../../../../../service/apollo/generated';
import {useSelectedMatch} from '../../../tabs/matches/state/useSelectedMatch';
import {getPartner} from '../../../tabs/matches/utils/match.utils';

export const useSkipVideo = () => {
    const {me} = useMe();
    const {t} = useTranslation();
    const [skipVideoMutation] = useSkipVideoMutation();
    const {selectedMatch} = useSelectedMatch();

    const skipVideo = useCallback(() => {
        if (!selectedMatch) {
            return;
        }

        skipVideoMutation({
            variables: {
                input: {
                    matchId: selectedMatch.id,
                },
            },
        }).then(() =>
            showMessage({
                message: t('home.tabs.matches.skipedVideo').replace(
                    '{partnerName}',
                    getPartner(me, selectedMatch).name!,
                ),
                type: 'success',
            }),
        );
    }, [t, me, selectedMatch, skipVideoMutation]);

    return {skipVideo};
};
