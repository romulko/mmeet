import {useNavigation} from '@react-navigation/native';
import {
    getMatchReviewStatus,
    getMatchStatus,
    getUserHasVideo,
    MatchStatus,
} from '../../components/matchRenderer/utils/match/match.utils';
import {
    HOME_MATCHES_PROPOSE_MEETING,
    HOME_PROFILE,
    HOME_WATCH_MMEET_VIDEO,
} from '../../../../../routes';
import {useMe} from '../../../../../../state/useMe';
import {ScreenContainer} from '../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../components/screenHeader';
import {useSelectedMatch} from '../../state/useSelectedMatch';
import {Spacer} from '../../../../../../components/spacer';
import {
    getAddress,
    getPartner,
    getPartnerAddress,
} from '../../utils/match.utils';
import {Alert, Pressable} from 'react-native';
import {
    useAcceptMutation,
    useCancelMutation,
} from '../../../../../../service/apollo/generated';
import {gql} from '@apollo/client';
import {Button} from '../../../../../../components/button';
import {Label} from '../../../../../../components/label';
import {MatchStatusRenderer} from '../../components/matchStatusRenderer';
import {AddressRenderer} from './components/addressRenderer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoadingLabel} from '../../../../../../components/loadingLabel';
import {Container} from '../../../../../../components/container';
import {useTranslation} from 'react-i18next';
import {ContentContainer, PartnerImage, PartnerName} from './Styles';
import {RESOURCE_URL} from '../../../../../../service/consts/consts';
import {getAge, getHeShe, getHisHer} from '../../../../../../utils/user.utils';
import {CameraIcon} from '../../components/cameraIcon';
import {Box} from '../../../../../../components/box';
import {WaitingDots} from './components/waitingDots';
import {MeetingIcon} from '../../components/meetingIcon';
import {OkIcon} from './components/okIcon';
import {CancelIcon} from './components/cancelIcon';
import {OpenMore} from './components/openMore';

export const Details = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {me} = useMe();
    const {selectedMatch, loading} = useSelectedMatch();

    const [acceptMutation] = useAcceptMutation({
        update: (cache, result) => {
            const meeting = result?.data?.accept;

            if (!meeting) {
                return;
            }

            cache.modify({
                id: cache.identify(me),
                fields: {
                    availableMeetings: value => value - 1,
                },
            });

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
                    acceptedAddress: () =>
                        cache.writeFragment({
                            fragment: gql`
                                fragment addAddress on Address {
                                    id
                                    placeId
                                    placeLabel
                                    time
                                }
                            `,
                            data: meeting.acceptedAddress,
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

            cache.modify({
                id: cache.identify(me),
                fields: {
                    availableMeetings: value => value + 1,
                },
            });

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

    if (loading) {
        return (
            <Container centered>
                <LoadingLabel />
            </Container>
        );
    }

    if (!selectedMatch) {
        return (
            <Container centered>
                <Label>{t('home.tabs.matches.notFound')}</Label>
            </Container>
        );
    }

    const partner = getPartner(me, selectedMatch);

    if (!partner) {
        return (
            <Container centered>
                <Label>No partner</Label>
            </Container>
        );
    }

    const previewVideoButtonPressHandler = () => {
        navigation.navigate(HOME_WATCH_MMEET_VIDEO, {
            userId: partner.id,
            showActions: true,
        });
    };

    const proposeMeetingButtonPressHandler = () => {
        navigation.navigate(HOME_MATCHES_PROPOSE_MEETING);
    };

    const acceptMeetingPressHandler = () => {
        acceptMutation({
            variables: {input: {matchId: selectedMatch.id}},
        });
        // .then(() => refetchAvailableMeetingsInThisWeek())
    };

    const cancelMeetingPressHandler = () => {
        cancelMutation({
            variables: {input: {matchId: selectedMatch.id}},
        });
        // .then(() => refetchAvailableMeetingsInThisWeek());
    };

    const cancelSetupedMeetingPressHandler = () => {
        Alert.alert(
            t('home.tabs.matches.details.cancelMeetingPopup.title'),
            t('home.tabs.matches.details.cancelMeetingPopup.message'),
            [
                {
                    text: t('home.tabs.matches.details.cancelMeetingPopup.no'),
                    style: 'cancel',
                },
                {
                    text: t(
                        'home.tabs.matches.details.cancelMeetingPopup.yesCancel',
                    ),
                    style: 'destructive',
                    onPress: () => {
                        cancelMeetingPressHandler();
                    },
                },
            ],
        );
    };

    const showPartnerVideoPressHandler = () => {
        navigation.navigate(HOME_WATCH_MMEET_VIDEO, {
            userId: partner.id,
        });
    };

    const matchReviewStatuses = getMatchReviewStatus(me, selectedMatch);
    const status = getMatchStatus(me, selectedMatch);
    const isPartnerHasVideo = getUserHasVideo(me, selectedMatch);

    const getStatusButton = () => {
        // videos
        if (matchReviewStatuses.length) {
            const children = [];

            if (
                matchReviewStatuses.includes(
                    MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO,
                )
            ) {
                if (!isPartnerHasVideo) {
                    return (
                        <Label>
                            {t('home.tabs.matches.partnerNeedsToHaveMainVideo')
                                .replace('{partnerName}', partner.name!)
                                .replace(
                                    '{hisHer}',
                                    getHisHer(partner.gender!),
                                )}
                        </Label>
                    );
                }

                children.push(
                    <Pressable
                        key="like"
                        onPress={previewVideoButtonPressHandler}>
                        <Box>
                            <CameraIcon variant="big" />

                            <Spacer wVariant="h3" />

                            <Label>
                                {t('home.tabs.matches.likeVideo').replace(
                                    '{heShe}',
                                    getHisHer(partner.gender!),
                                )}
                            </Label>
                        </Box>
                    </Pressable>,
                );
            }

            if (
                matchReviewStatuses.includes(
                    MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO,
                )
            ) {
                if (children.length) {
                    children.push(<Spacer key="spacer" hVariant="h2" />);
                }

                children.push(
                    <Box
                        key="waiting"
                        alignItems="center"
                        justifyContent="flex-end">
                        <WaitingDots />

                        <Spacer wVariant="h3" />

                        <Label variant="h3">
                            {t('home.tabs.matches.waitingLike').replace(
                                '{hisHer}',
                                getHisHer(partner.gender!),
                            )}
                        </Label>
                    </Box>,
                );
            }

            if (children.length) {
                return children;
            }
        }

        if (!me.contactInfo) {
            const goToContactInfo = () => {
                navigation.navigate(HOME_PROFILE);
            };

            return (
                <Box dir="column">
                    <Label>
                        {t('home.tabs.matches.fillContactInfo').replace(
                            '{partnerName}',
                            partner.name!,
                        )}
                    </Label>

                    <Spacer hVariant="h2" />

                    <Button
                        title={t('profile.title')}
                        onPress={goToContactInfo}
                    />
                </Box>
            );
        }

        if (!partner.contactInfo) {
            return (
                <Box dir="column">
                    <Label>
                        {t('home.tabs.matches.waitContactInfo')
                            .replace('{partnerName}', partner.name!)
                            .replace('{heShe}', getHeShe(partner.gender!))}
                    </Label>
                </Box>
            );
        }

        switch (status) {
            case MatchStatus.YOU_MUST_PROPOSE_MEETING: {
                return (
                    <Box alignItems="center">
                        <MeetingIcon variant="big" />

                        <Spacer wVariant="h2" />

                        <Button
                            title={t('home.tabs.matches.proposeMeeting')}
                            onPress={proposeMeetingButtonPressHandler}
                        />
                    </Box>
                );
            }
            case MatchStatus.PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING: {
                const address = getAddress(me, selectedMatch);

                return (
                    <Box>
                        <MeetingIcon variant="big" />

                        <Spacer wVariant="h2" />

                        <Box dir="column">
                            <AddressRenderer
                                match={selectedMatch}
                                address={address}
                            />

                            <Spacer hVariant="h3" />

                            <Pressable onPress={cancelMeetingPressHandler}>
                                <CancelIcon />
                            </Pressable>

                            <Spacer hVariant="h2" />

                            <Box alignItems="center" justifyContent="flex-end">
                                <WaitingDots />

                                <Spacer wVariant="h3" />

                                <Label variant="h3">
                                    {t(
                                        'home.tabs.matches.waitingResponse',
                                    ).replace(
                                        '{hisHer}',
                                        getHisHer(partner.gender!),
                                    )}
                                </Label>
                            </Box>
                        </Box>
                    </Box>
                );
            }
            case MatchStatus.YOU_MUST_ACCEPT_OR_DECLINE_MEETING: {
                const address = getPartnerAddress(me, selectedMatch);

                return (
                    <Box>
                        <MeetingIcon variant="big" />

                        <Spacer wVariant="h2" />

                        <Box dir="column">
                            <AddressRenderer
                                match={selectedMatch}
                                address={address}
                            />

                            <Spacer hVariant="h3" />

                            <Box>
                                <Pressable onPress={cancelMeetingPressHandler}>
                                    <CancelIcon />
                                </Pressable>

                                <Spacer wVariant="h2" />

                                <Pressable onPress={acceptMeetingPressHandler}>
                                    <OkIcon />
                                </Pressable>
                            </Box>
                        </Box>
                    </Box>
                );
            }
            case MatchStatus.MEETING_SETUP: {
                const meetingDate = new Date(
                    selectedMatch.meeting?.acceptedAddress?.time,
                );

                const isContactShow =
                    new Date().getTime() >
                    meetingDate.getTime() - 30 * 60 * 1000;

                const capitalizeFirstLetter = (str: string) =>
                    str.charAt(0).toUpperCase() + str.slice(1);

                const contactData = isContactShow
                    ? partner.contactInfo
                    : capitalizeFirstLetter(
                          t('home.tabs.matches.contactInfo').replace(
                              '{hisHer}',
                              getHisHer(partner.gender!),
                          ),
                      );

                return (
                    <Box>
                        <Box dir="column">
                            <Label color="success">
                                {t('home.tabs.matches.statues.MEETING_SETUP')}
                            </Label>

                            <Spacer hVariant="h2" />

                            <MatchStatusRenderer match={selectedMatch} />

                            <Spacer hVariant="h4" />

                            <Pressable
                                onPress={cancelSetupedMeetingPressHandler}>
                                <CancelIcon />
                            </Pressable>

                            <Spacer hVariant="h2" />

                            {isContactShow && (
                                <Label>{t('profile.contactInfo')}</Label>
                            )}
                            <Label>{contactData}</Label>
                        </Box>
                    </Box>
                );
            }
        }
    };

    const partnerImagePressHandler = () => {
        if (!isPartnerHasVideo) {
            return;
        }

        navigation.navigate(HOME_WATCH_MMEET_VIDEO, {
            userId: partner.id,
        });
    };

    return (
        <ScreenContainer useScrollable>
            <ScreenHeader rightContent={<OpenMore />} />

            <Pressable onPress={partnerImagePressHandler}>
                <PartnerImage
                    source={{
                        uri: `${RESOURCE_URL}/${partner.id}/photo.jpeg`,
                    }}
                />
            </Pressable>

            <Spacer hVariant="h4" />

            <ContentContainer>
                <Box alignItems="center" justifyContent="space-between">
                    <PartnerName>
                        {partner.name}, {getAge(partner.birthday)}
                    </PartnerName>

                    {!matchReviewStatuses.includes(
                        MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO,
                    ) &&
                        isPartnerHasVideo && (
                            <Pressable onPress={showPartnerVideoPressHandler}>
                                <CameraIcon variant="big" />
                            </Pressable>
                        )}
                </Box>

                <Spacer hVariant="h2" />

                {getStatusButton()}

                {/*<TestFCM />*/}
            </ContentContainer>
        </ScreenContainer>
    );
};
