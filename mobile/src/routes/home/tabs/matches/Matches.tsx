import React from 'react';
import {ScreenContainer} from '../../../../components/screenContainer';
import {Spacer} from '../../../../components/spacer';
import {Label} from '../../../../components/label';
import {
    Container,
    List,
    MatchRendererWrapper,
    LoadingMatchesContainer,
    Centered,
} from './Styles';
import {MatchRenderer} from './components/matchRenderer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSetRecoilState} from 'recoil';
import {selectedMatchIdState} from './state/useSelectedMatch';
import {useMe} from '../../../../state/useMe';
import {Match, useMatches} from './state/useMatches';
import {
    HOME_MATCHES_DETAILS,
    HOME_MATCHES_SUBSCRIPTIONS,
} from '../../../routes';
import {LoadingLabel} from '../../../../components/loadingLabel';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';
import {Box} from '../../../../components/box';

export const Matches = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const setSelectedMatchId = useSetRecoilState(selectedMatchIdState);
    const {me} = useMe();
    const {matches, loading} = useMatches();
    const {t} = useTranslation();

    if (loading) {
        return (
            <ScreenContainer>
                <LoadingMatchesContainer>
                    <LoadingLabel />
                </LoadingMatchesContainer>
            </ScreenContainer>
        );
    }

    const subscriptionsPressHandelr = () => {
        navigation.navigate(HOME_MATCHES_SUBSCRIPTIONS);
    };

    const matchRendererPressHandler = (match: Match) => {
        setSelectedMatchId(match.id);

        navigation.navigate(HOME_MATCHES_DETAILS);
    };

    const matchesArr = matches?.filter(
        value => !value?.meeting?.acceptedAddress,
    );
    const matchesExists = matchesArr && matchesArr.length > 0;

    const datesArr = matches
        ?.filter(value => !!value?.meeting?.acceptedAddress)
        .sort(
            (a, b) =>
                new Date(a.meeting!.acceptedAddress!.time).getTime() -
                new Date(b.meeting!.acceptedAddress!.time).getTime(),
        );
    const datesExists = datesArr && datesArr.length > 0;

    return (
        <ScreenContainer>
            {/*<Pressable onPress={subscriptionsPressHandelr}>*/}
            {/*    <Box justifyContent="flex-end">*/}
            {/*        <Label variant="h4">{t('subscriptions.name')}</Label>*/}
            {/*    </Box>*/}
            {/*</Pressable>*/}

            <Centered>
                <Spacer hVariant="h2" />

                <Container>
                    <Label variant="h1">{t('home.tabs.matches.label')}</Label>

                    <Spacer hVariant="h4" />

                    {matchesExists && (
                        <List horizontal showsHorizontalScrollIndicator={false}>
                            {matchesArr.map(value => (
                                <MatchRendererWrapper
                                    key={value.id}
                                    onPress={() =>
                                        matchRendererPressHandler(value)
                                    }>
                                    <MatchRenderer match={value} me={me} />
                                </MatchRendererWrapper>
                            ))}
                        </List>
                    )}

                    {!matchesExists && (
                        <Label variant="h3" color="gray">
                            {t('home.tabs.matches.noMatches')}
                        </Label>
                    )}
                </Container>

                <Spacer hVariant="h1" />
                <Spacer hVariant="h3" />

                <Container>
                    <Label variant="h1">{t('home.tabs.matches.dates')}</Label>

                    <Spacer hVariant="h4" />

                    {datesExists && (
                        <List horizontal showsHorizontalScrollIndicator={false}>
                            {datesArr.map(value => (
                                <MatchRendererWrapper
                                    key={value.id}
                                    onPress={() =>
                                        matchRendererPressHandler(value)
                                    }>
                                    <MatchRenderer
                                        match={value}
                                        me={me}
                                        imageVariant="date"
                                    />
                                </MatchRendererWrapper>
                            ))}
                        </List>
                    )}

                    {!datesExists && (
                        <Label variant="h3" color="gray">
                            {t('home.tabs.matches.noDates')}
                        </Label>
                    )}
                </Container>
            </Centered>
        </ScreenContainer>
    );
};
