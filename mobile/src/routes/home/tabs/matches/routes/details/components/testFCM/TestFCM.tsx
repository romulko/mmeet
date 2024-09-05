import {Button} from '../../../../../../../../components/button';
import {View} from 'react-native';
import {Spacer} from '../../../../../../../../components/spacer';
import {
    useCancelMutation,
    useProposeMutation,
} from '../../../../../../../../service/apollo/generated';
import {gql} from '@apollo/client';
import {useSelectedMatch} from '../../../../state/useSelectedMatch';

export const TestFCM = () => {
    const {selectedMatch} = useSelectedMatch();

    const [proposeMutation] = useProposeMutation({
        update: (cache, result) => {
            if (!result.data?.propose) {
                return;
            }

            cache.modify({
                id: cache.identify(result.data?.propose.match),
                fields: {
                    meeting: () =>
                        cache.writeFragment({
                            fragment: gql`
                                fragment addMeeting on Meeting {
                                    id
                                    fromUserAddress {
                                        id
                                        placeId
                                        placeLabel
                                        time
                                        lat
                                        lng
                                    }
                                    toUserAddress {
                                        id
                                        placeId
                                        placeLabel
                                        time
                                        lat
                                        lng
                                    }
                                }
                            `,
                            data: result.data!.propose,
                        }),
                },
            });
        },
    });

    const [cancelMutation] = useCancelMutation({
        update: (cache, result) => {
            const meeting = result?.data?.cancel;

            if (!meeting) {
                return;
            }

            if (meeting.fromUserAddress) {
                cache.evict({id: cache.identify(meeting.fromUserAddress)});
            }

            if (meeting?.toUserAddress) {
                cache.evict({id: cache.identify(meeting.toUserAddress)});
            }

            cache.modify({
                id: cache.identify(meeting),
                fields: {
                    fromUserAddress: () => null,
                    toUserAddress: () => null,
                },
            });
        },
    });

    const proposeMeetingHandler = () => {
        if (!selectedMatch) {
            return;
        }

        proposeMutation({
            variables: {
                input: {
                    time: new Date(),
                    placeLabel: 'вулиця Івана Мазепи, 3',
                    placeId: 'ChIJIUfMpa_P1EARoqbw1QhHX50',
                    matchId: selectedMatch.id,
                },
            },
        });
    };

    const declineMeetingHandler = () => {
        if (!selectedMatch) {
            return;
        }

        cancelMutation({
            variables: {input: {matchId: selectedMatch.id}},
        });
    };

    return (
        <View>
            <Button title="Propose Meeting" onPress={proposeMeetingHandler} />

            <Spacer hVariant="h2" />

            <Button title="Decline Meeting" onPress={declineMeetingHandler} />
        </View>
    );
};
