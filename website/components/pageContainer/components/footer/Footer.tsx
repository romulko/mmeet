import styled from 'styled-components';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';

const Footer = () => {
    const {t} = useTranslation('footer');

    return (
        <Container>
            <Column>
                <LogoContainer>
                    <Image src="/logo.png" width={40} height={40} alt="Logo" />

                    <Link href="/">
                        <Logo>mmeet</Logo>
                    </Link>

                    <Beta>beta</Beta>
                </LogoContainer>

                <MadeIn>{t('madeInUkraine')} 🇺🇦</MadeIn>
            </Column>

            <MenusContainer>
                <Link href="/about">
                    <MenuItem>{t('about')}</MenuItem>
                </Link>

                <Link href="/team">
                    <MenuItem>{t('team')}</MenuItem>
                </Link>

                <Link href="/statistic">
                    <MenuItem>{t('statistic')}</MenuItem>
                </Link>

                <Link href="/privacyPolicy">
                    <MenuItem>{t('privacyPolicy')}</MenuItem>
                </Link>

                <Link href="/terms">
                    <MenuItem>{t('terms')}</MenuItem>
                </Link>

                <Link href="/contacts">
                    <MenuItem>{t('contacts')}</MenuItem>
                </Link>
            </MenusContainer>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: black;
    padding: 20px;
    color: white;
`;

const Column = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;
`;

const MadeIn = styled.p`
    color: #bebe9f;
    font-size: 14px;
    font-weight: lighter;
`;

const Logo = styled.p`
    font-size: 22px;
    cursor: pointer;
`;

const Beta = styled.p`
    font-size: 12px;
    color: gray;
    padding-left: 2px;
`;

const MenusContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const MenuItem = styled.p`
    cursor: pointer;
`;
