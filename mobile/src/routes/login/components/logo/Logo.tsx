import React from 'react';
import {Container, LogoImage, LogoLabel} from './Styles';
import {Spacer} from '../../../../components/spacer';

export const Logo = () => {
    return (
        <Container>
            <LogoImage source={require('./logo.png')} />

            <Spacer wVariant="h4" />

            <LogoLabel testID="logo">mmeet</LogoLabel>
        </Container>
    );
};
