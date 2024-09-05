import styled from 'styled-components';
import {RoundIcon} from '../components/index/components/roundIcon/RoundIcon';
import Image from 'next/image';
import {Section} from '../components/section/Section';
import Head from 'next/head';
import {PageContainer} from '../components/pageContainer/PageContainer';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import {TelegramChannel} from '../components/telegramChannel/TelegramChannel';

export default function Home() {
    const {t} = useTranslation('index');

    return (
        <>
            <Head>
                <title>mmeet</title>
            </Head>

            <PageContainer>
                <LogoContainer>
                    <Image src="/logo.png" width={40} height={40} alt="Logo" />

                    <TitleContainer>
                        <LogoTextContainer>
                            <Title>mmeet</Title>
                            <Beta>beta</Beta>
                        </LogoTextContainer>

                        <TitleDescription>{t('subLogo')}</TitleDescription>
                    </TitleContainer>
                </LogoContainer>

                <SubTitle>{t('title')}</SubTitle>

                <Section title={t('howItWorks.title')}>
                    <HowItWorksContainer>
                        <SectionItemContainer>
                            <RoundIcon color="#ffda95" num={1} />

                            <SectionItemText
                                dangerouslySetInnerHTML={{
                                    __html: t('howItWorks.steps.1'),
                                }}
                            />
                        </SectionItemContainer>

                        <SectionItemContainer>
                            <RoundIcon color="#ffda95" num={2} />

                            <SectionItemText
                                dangerouslySetInnerHTML={{
                                    __html: t('howItWorks.steps.2'),
                                }}
                            />
                        </SectionItemContainer>

                        <SectionItemContainer>
                            <RoundIcon color="#ffda95" num={3} />

                            <SectionItemText
                                dangerouslySetInnerHTML={{
                                    __html: t('howItWorks.steps.3'),
                                }}
                            />
                        </SectionItemContainer>
                    </HowItWorksContainer>

                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/RJS62sQqXwA?controls=0"
                        title="mmeet.app | Відео презентація"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </Section>

                <Section>
                    <StoresContainer>
                        <StoreContainer>
                            <Image
                                src="/appStore.png"
                                alt="Download from app store"
                                width={110}
                                height={40}
                            />

                            <AvailableSoon>
                                {t('willBeAvailableSoon')}
                            </AvailableSoon>
                        </StoreContainer>

                        <a
                            href="https://play.google.com/store/apps/details?id=app.mmeet"
                            target="_blank"
                            rel="noreferrer">
                            <Image
                                src="/googlePlay.png"
                                alt="Download from app store"
                                width={110}
                                height={40}
                            />
                        </a>
                    </StoresContainer>
                </Section>

                <Section
                    title={t('mmeetQuestions.title')}
                    description={t('mmeetQuestions.description')}
                />

                <Section
                    title={t('yourAttentionMatter.title')}
                    description={t('yourAttentionMatter.description')}
                />

                <Section
                    title={t('whyItMatters.title')}
                    description={t('whyItMatters.description')}
                />

                <Section
                    title={t('inviteFriend.title')}
                    description={t('inviteFriend.description')}
                />

                <Section>
                    <Centered>
                        <ConnectToUs>Долучайтесь 👋</ConnectToUs>
                    </Centered>

                    <br />

                    <StoresContainer>
                        <StoreContainer>
                            <Image
                                src="/appStore.png"
                                alt="Download from app store"
                                width={110}
                                height={40}
                            />

                            <AvailableSoon>
                                {t('willBeAvailableSoon')}
                            </AvailableSoon>
                        </StoreContainer>

                        <a
                            href="https://play.google.com/store/apps/details?id=app.mmeet"
                            target="_blank"
                            rel="noreferrer">
                            <Image
                                src="/googlePlay.png"
                                alt="Download from app store"
                                width={110}
                                height={40}
                            />
                        </a>
                    </StoresContainer>
                </Section>

                <TelegramChannel />

                <br />
                <br />
            </PageContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['index', 'footer'])),
    },
});

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;
    margin-bottom: 30px;
`;

const LogoTextContainer = styled.div`
    display: flex;
    align-items: center;
    padding-top: 16px;
    gap: 4px;
`;

const Title = styled.h1``;

const Beta = styled.p`
    color: #bbbbbb;
`;

const TitleDescription = styled.p`
    color: #666;
`;

const SubTitle = styled.h2`
    padding-bottom: 40px;
    font-weight: normal;
    font-size: 22px;
`;

const HowItWorksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
`;

const SectionItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SectionItemText = styled.p``;

const StoresContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
`;

const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.3;
`;

const AvailableSoon = styled.p`
    font-size: 12px;
`;

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ConnectToUs = styled.p`
    margin-bottom: 6px;
`;
