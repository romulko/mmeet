import React, {FC} from 'react';
import {Container as ContainerStyled, Wrapper} from './Styles';

export interface Props {
    centered?: boolean;
    children: any;
}

export const Container: FC<Props> = props => {
    return (
        <ContainerStyled>
            <Wrapper {...props}>{props.children}</Wrapper>
        </ContainerStyled>
    );
};
