import React from 'react';
import {HeaderMenu} from './components/headerMenu';
import {Proposal} from './components/proposal';
import {Container} from './Styles';

export const Find = () => {
    return (
        <Container>
            <Proposal />

            <HeaderMenu />
        </Container>
    );
};
