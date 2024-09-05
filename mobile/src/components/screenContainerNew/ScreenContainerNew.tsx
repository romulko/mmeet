import React, {FC} from 'react';
import {BackButtonWrapper, Container, ContentContainer} from './Styles';
import {ColoursBackground} from './components/coloursBackground';
import {BackButton} from '../backButton';
import {useNavigation} from '@react-navigation/native';

interface Props {
    useScrollable?: boolean;
    children: any;
}

export const ScreenContainerNew: FC<Props> = ({useScrollable, children}) => {
    const navigation = useNavigation();

    const backButtonPressHandler = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <BackButtonWrapper>
                <BackButton onPress={backButtonPressHandler} />
            </BackButtonWrapper>

            <ContentContainer>
                <ColoursBackground />

                {children}
            </ContentContainer>
        </Container>
    );
};
