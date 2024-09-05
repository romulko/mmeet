import React, {useEffect} from 'react';
import {ScreenContainer} from '../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../components/screenHeader';
import {useSelectedMatch} from '../../../../state/useSelectedMatch';
import {getAddress} from '../../../../utils/match.utils';
import {useMe} from '../../../../../../../../state/useMe';
import {Spacer} from '../../../../../../../../components/spacer';
import {useRecoilState} from 'recoil';
import {proposeAddressState} from './state/meeting.state';
import {
    Address,
    useProposeMutation,
} from '../../../../../../../../service/apollo/generated';
import {useNavigation, useRoute} from '@react-navigation/native';
import {gql} from '@apollo/client';
import {Button} from '../../../../../../../../components/button';
import {FormItem} from '../../../../../../../../components/formItem';
import {AddressEditor} from './components/editors/addressEditor';
import {
    getDateFormatted,
    getTimeFormatted,
} from '../../../../../../../../utils/date.utils';
import {DateChooser} from '../../../../../../../../components/dateChooser';
import {useTranslation} from 'react-i18next';

export const ProposeMeeting = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const {me} = useMe();
    const {selectedMatch} = useSelectedMatch();
    const [proposeAddress, setProposeAddress] =
        useRecoilState(proposeAddressState);

    const [proposeMutation, {loading}] = useProposeMutation({
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
    const {params} = useRoute<any>();

    useEffect(() => {
        if (!selectedMatch) {
            return;
        }

        setProposeAddress(getAddress(me, selectedMatch));
    }, [params, setProposeAddress, me, selectedMatch]);

    const proposeButtonPressHandler = () => {
        if (!proposeAddress || !selectedMatch) {
            return;
        }

        proposeMutation({
            variables: {
                input: {
                    time: proposeAddress.time,
                    placeLabel: proposeAddress.placeLabel,
                    placeId: proposeAddress.placeId,
                    matchId: selectedMatch.id,
                },
            },
        }).then(() => navigation.goBack());
    };

    const dateChooserChangeHandler = (date: Date) => {
        setProposeAddress({
            ...proposeAddress,
            time: date,
        } as Address);
    };

    return (
        <ScreenContainer>
            <ScreenHeader
                title={t('home.tabs.matches.routes.proposeMeeting.title')}
            />

            <Spacer hVariant="h1" />

            <DateChooser
                label={t('home.tabs.matches.routes.proposeMeeting.date')}
                value={getDateFormatted(proposeAddress?.time)}
                date={
                    proposeAddress?.time ? new Date(proposeAddress?.time) : null
                }
                mode="date"
                display="default"
                onDateChange={dateChooserChangeHandler}
            />

            <Spacer hVariant="h1" />

            <DateChooser
                label={t('home.tabs.matches.routes.proposeMeeting.time')}
                value={getTimeFormatted(proposeAddress?.time)}
                date={
                    proposeAddress?.time ? new Date(proposeAddress?.time) : null
                }
                mode="time"
                display="clock"
                onDateChange={dateChooserChangeHandler}
            />

            <Spacer hVariant="h1" />

            <FormItem
                label={t('home.tabs.matches.routes.proposeMeeting.address')}
                value={proposeAddress?.placeLabel}
                editor={closeModal => <AddressEditor closeModal={closeModal} />}
            />

            <Spacer hVariant="h1" />

            <Button
                title={t(
                    'home.tabs.matches.routes.proposeMeeting.proposeButton',
                )}
                loading={loading}
                disabled={
                    !proposeAddress?.time ||
                    !proposeAddress?.placeLabel ||
                    !proposeAddress?.placeId
                }
                onPress={proposeButtonPressHandler}
            />
        </ScreenContainer>
    );
};
