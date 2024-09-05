import messaging from '@react-native-firebase/messaging';
import {makeVar} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {client} from '../apollo/client';
import {MatchesDocument, MeDocument, MeQuery} from '../apollo/generated';
import i18n from '../i18n';

export const isVideoProcessingState = makeVar(false);

export const setupFCM = () => {
    messaging().requestPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log(
            'fcm setBackgroundMessageHandler',
            JSON.stringify(remoteMessage),
        );
    });

    messaging().onMessage(({data}) => {
        if (!data) {
            return;
        }

        const cache = client.cache;

        const meData = cache.readQuery<MeQuery>({
            query: MeDocument,
        });

        const me = meData?.me;

        console.log('fcm onMessage', data, 'meId', me?.id);

        if (!me) {
            return;
        }

        const {type, userName} = data;

        switch (type) {
            case 'IT_IS_MATCH': {
                const matchesData = client.readQuery({query: MatchesDocument});
                if (matchesData) {
                    client.refetchQueries({include: [MatchesDocument]});
                }

                const {fromUserName, toUserName} = data;

                showMessage({
                    message: i18n
                        .t('notifications.IT_IS_MATCH')
                        .replace('{fromUserName}', fromUserName)
                        .replace('{toUserName}', toUserName),
                    type: 'success',
                    duration: 4000,
                });

                break;
            }
            case 'MATCH_INTERESTING_VIDEO': {
                client.refetchQueries({include: [MatchesDocument]});

                showMessage({
                    message: i18n
                        .t('notifications.MATCH_INTERESTING_VIDEO')
                        .replace('{userName}', userName),
                    type: 'success',
                    duration: 4000,
                });

                break;
            }
            case 'MEETING_PROPOSE': {
                client.refetchQueries({include: [MatchesDocument]});

                showMessage({
                    message: i18n
                        .t('notifications.MEETING_PROPOSE')
                        .replace('{userName}', userName),
                    type: 'success',
                    duration: 4000,
                });

                break;
            }
            case 'MEETING_CANCEL': {
                client.refetchQueries({include: [MatchesDocument]});

                client.cache.modify({
                    id: client.cache.identify(me),
                    fields: {
                        availableMeetings: value => value + 1,
                    },
                });

                showMessage({
                    message: i18n
                        .t('notifications.MEETING_CANCEL')
                        .replace('{userName}', userName),
                    type: 'success',
                    duration: 4000,
                });

                break;
            }
            case 'MEETING_ACCEPT': {
                client.refetchQueries({include: [MatchesDocument]});

                showMessage({
                    message: i18n
                        .t('notifications.MEETING_ACCEPT')
                        .replace('{userName}', userName),
                    type: 'success',
                    duration: 4000,
                });

                break;
            }
            case 'VIDEO_PROCESSING': {
                const isProcessing = data.videoIsProcessing === 'true';

                if (!isProcessing) {
                    showMessage({
                        message: i18n.t('notifications.VIDEO_PROCESSING'),
                        type: 'success',
                        duration: 4000,
                    });
                }

                isVideoProcessingState(isProcessing);
                break;
            }
        }
    });
};

export const cleanupFCM = async () => {
    // TODO implement
};
