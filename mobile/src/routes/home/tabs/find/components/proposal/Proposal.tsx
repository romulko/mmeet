import React from 'react';
import {
    ActionsContainer,
    Avatar,
    AvatarLoaderWrapper,
    AvatarWrapper,
    Container,
    NoProposalsContainer,
    PanelContainer,
    ProposalName,
} from './Styles';
import {Spacer} from '../../../../../../components/spacer';
import {useProposal} from './hooks/useProposal';
import {LoadingLabel} from '../../../../../../components/loadingLabel';
import {Label} from '../../../../../../components/label';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../../../../components/button';
import {SkipButton} from './components/skipButton';
import {LikeButton} from './components/likeButton';
import {ActivityIndicator, Pressable} from 'react-native';
import {getAge} from '../../../../../../utils/user.utils';
import {Box} from '../../../../../../components/box';
import {RESOURCE_URL} from '../../../../../../service/consts/consts';
import {MinusSmile} from './components/minusSmile';
import {ScreenContainer} from '../../../../../../components/screenContainer';
import {ColoursBackground} from '../../../../../../components/screenContainer/components/coloursBackground';

export const Proposal = () => {
    const {t} = useTranslation();
    const {fetchProposals, proposal, skip, like, loading} = useProposal();

    if (loading) {
        return (
            <ScreenContainer>
                <NoProposalsContainer>
                    <LoadingLabel />
                </NoProposalsContainer>
            </ScreenContainer>
        );
    }

    if (!proposal) {
        return (
            <ScreenContainer>
                <NoProposalsContainer>
                    <Box>
                        <Label testID="noProposal">
                            {t('home.tabs.find.noProposal')}
                        </Label>

                        <Spacer wVariant="h4" />

                        <MinusSmile />
                    </Box>

                    <Spacer hVariant="h2" />

                    <Button
                        title={t('home.tabs.find.fetchProposals')}
                        onPress={fetchProposals}
                    />
                </NoProposalsContainer>
            </ScreenContainer>
        );
    }

    return (
        <Container>
            <AvatarWrapper>
                <AvatarLoaderWrapper>
                    <ActivityIndicator size="large" />
                </AvatarLoaderWrapper>

                <Avatar
                    source={{
                        uri: `${RESOURCE_URL}/${
                            proposal.id
                        }/photo.jpeg?hash=${Date.now()}`,
                    }}
                />
            </AvatarWrapper>

            <PanelContainer>
                <ColoursBackground />

                <Box alignItems="center" justifyContent="space-between">
                    <ProposalName>
                        {proposal.name}, {getAge(proposal.birthday)}
                    </ProposalName>

                    <ActionsContainer>
                        <Pressable onPress={skip}>
                            <SkipButton />
                        </Pressable>

                        <Spacer wVariant="h2" />
                        <Spacer wVariant="h3" />

                        <Pressable onPress={like}>
                            <LikeButton />
                        </Pressable>
                    </ActionsContainer>
                </Box>
            </PanelContainer>
        </Container>
    );
};
