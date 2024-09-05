import React, {FC} from 'react';
import {
    Container as ContainerStyled,
    ContentContainer,
    ScrollableWrapper,
    Wrapper,
} from './Styles';
import {ColoursBackground} from './components/coloursBackground';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
    useScrollable?: boolean;
    children: any;
}

export const ScreenContainer: FC<Props> = ({useScrollable, children}) => {
    const getWrapper = () => {
        if (useScrollable) {
            return (
                <SafeAreaView>
                    <ScrollableWrapper keyboardShouldPersistTaps="always">
                        {children}
                    </ScrollableWrapper>
                </SafeAreaView>
            );
        } else {
            return (
                <ContentContainer>
                    <Wrapper>{children}</Wrapper>
                </ContentContainer>
            );
        }
    };

    return (
        <ContainerStyled>
            <ColoursBackground />

            {getWrapper()}
        </ContainerStyled>
    );
};
