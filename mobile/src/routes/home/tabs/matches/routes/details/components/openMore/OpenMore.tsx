import {OpenMoreIcon} from '../../../../../../../../components/icons/openMoreIcon';
import {ModalComp} from '../../../../../../../../components/formItem/components/modalComp';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '../../../../../../../../components/button';
import {HOME_MATCHES_DETAILS_COMPLAINT} from '../../../../../../../routes';
import {Alert} from 'react-native';
import {useSelectedMatch} from '../../../../state/useSelectedMatch';
import {Spacer} from '../../../../../../../../components/spacer';
import {useApolloClient} from '@apollo/client';
import {
    Match,
    MatchesDocument,
    MatchesQuery,
    MatchesQueryVariables,
} from '../../../../../../../../service/apollo/generated';
import {useSkipVideo} from '../../../../../../routes/watchMmeetVideo/hooks/useSkipVideo';

export const OpenMore = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {selectedMatch, partner} = useSelectedMatch();
    const {skipVideo} = useSkipVideo();
    const apolloClient = useApolloClient();

    const complaintPressHandler = () => {
        navigation.navigate(HOME_MATCHES_DETAILS_COMPLAINT);
    };

    const unmatchPressHandler = () => {
        Alert.alert(
            t('home.tabs.matches.openMore.unmatch.title').replace(
                '{partnerName}',
                partner?.name || '',
            ),
            t('home.tabs.matches.openMore.unmatch.description').replace(
                '{partnerName}',
                partner?.name || '',
            ),
            [
                {
                    text: t('labels.alert.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('home.tabs.matches.openMore.unmatch.yesUnmatch'),
                    style: 'destructive',
                    onPress: () => {
                        skipVideo();

                        const matchesData: any = apolloClient.cache.readQuery({
                            query: MatchesDocument,
                        });

                        if (!matchesData || !selectedMatch) {
                            return;
                        }

                        apolloClient.cache.writeQuery<
                            MatchesQuery,
                            MatchesQueryVariables
                        >({
                            query: MatchesDocument,
                            data: {
                                matches: matchesData.matches.filter(
                                    (value: Match) =>
                                        value.id !== selectedMatch.id,
                                ),
                            },
                        });

                        navigation.goBack();
                    },
                },
            ],
        );
    };

    const getModalContent = (closeModal: () => void) => {
        return (
            <>
                <Button
                    title={t('home.tabs.matches.openMore.unmatch.buttonLabel')}
                    onPress={() => {
                        closeModal();
                        unmatchPressHandler();
                    }}
                />

                <Spacer hVariant="h2" />

                <Button
                    title={t('home.tabs.matches.openMore.complaint')}
                    onPress={() => {
                        closeModal();
                        complaintPressHandler();
                    }}
                />
            </>
        );
    };

    return (
        <ModalComp modalContent={getModalContent}>
            <OpenMoreIcon />
        </ModalComp>
    );
};
