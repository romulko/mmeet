import React from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useLoginHandler} from './hooks/useLoginHandler';
import {AuthButtonsContainer, Container, TextWrapper} from './Styles';
import {useTrySilentlyLogin} from './hooks/useTrySilentlyLogin';
import {Logo} from './components/logo';
import {Spacer} from '../../components/spacer';
import {Label} from '../../components/label';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {StyleSheet} from 'react-native';
import {ColoursBackground} from '../../components/screenContainer/components/coloursBackground';
import {IS_IOS} from '../../utils/platform.utils';
import {useTranslation} from 'react-i18next';

export const Login = () => {
    const {loading} = useTrySilentlyLogin();
    const {loginHandler, loginAppleHandler} = useLoginHandler();
    const {t} = useTranslation();

    return (
        <Container>
            <ColoursBackground />

            <Logo />

            <Spacer hVariant="h3" />

            <TextWrapper>
                <Label color="gray">{t('login.title')}</Label>
            </TextWrapper>

            {!loading && (
                <AuthButtonsContainer>
                    <Spacer hVariant="h1" />
                    <Spacer hVariant="h1" />

                    {IS_IOS && (
                        <>
                            <AppleButton
                                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                                style={styles.appleSignInButton}
                                onPress={loginAppleHandler}
                            />

                            <Spacer hVariant="h2" />
                        </>
                    )}

                    <GoogleSigninButton
                        style={styles.googleSignInButton}
                        onPress={loginHandler}
                    />
                </AuthButtonsContainer>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    googleSignInButton: {width: '100%'},
    appleSignInButton: {
        height: 40,
    },
});
