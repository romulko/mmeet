import React, {useState} from 'react';
import {BackButtonPlaceholder, ContentContainer} from './Styles';
import {STEPS} from './steps';
import {Platform} from 'react-native';
import {ScreenContainer} from '../../components/screenContainer';
import {Spacer} from '../../components/spacer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HOME} from '../routes';
import {useRecoilValue} from 'recoil';
import {nextButtonEnabledState} from './state/nextButtonEnabled.state';
import {BackButton} from '../../components/backButton';
import {Button} from './components/button';
import {useTranslation} from 'react-i18next';

export const Registration = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const nextButtonEnabled = useRecoilValue(nextButtonEnabledState);
    const {t} = useTranslation();

    const nextButtonPressHandler = async () => {
        if (currentStepIndex === STEPS.length - 1) {
            navigation.replace(HOME);
        } else {
            setCurrentStepIndex(prevState => prevState + 1);
        }
    };

    const backButtonPressHandler = () => {
        setCurrentStepIndex(prevState => prevState - 1);
    };

    const Step = STEPS[currentStepIndex];

    const isBackButtonVisible = currentStepIndex > 0;

    return (
        <ScreenContainer>
            {!isBackButtonVisible && (
                <>
                    <Spacer hVariant="h3" />

                    <BackButtonPlaceholder />
                </>
            )}

            {isBackButtonVisible && (
                <>
                    <Spacer hVariant="h3" />

                    <BackButton onPress={backButtonPressHandler} />
                </>
            )}

            <ContentContainer
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Step />

                <Spacer hVariant="h1" />

                <Button
                    title={
                        currentStepIndex === STEPS.length - 1
                            ? t('registration.goToHome')
                            : t('labels.next')
                    }
                    disabled={!nextButtonEnabled}
                    onPress={nextButtonPressHandler}
                />

                <Spacer hVariant="h1" />
            </ContentContainer>
        </ScreenContainer>
    );
};
