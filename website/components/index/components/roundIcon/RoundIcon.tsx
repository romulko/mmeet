import styled from 'styled-components';
import {FC} from 'react';

interface Props {
    num: number;
    color: any;
}

export const RoundIcon: FC<Props> = ({num, color}) => {
    return (
        <Container color={color}>
            <Num>{num}</Num>
        </Container>
    );
};

const Container = styled.div<{color: any}>`
    width: 32px;
    height: 32px;
    background-color: ${({color}) => color};
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
`;

const Num = styled.p``;
