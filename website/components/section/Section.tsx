import styled from 'styled-components';
import {FC} from 'react';

interface Props {
    title?: string;
    description?: string;
    children?: any;
}

export const Section: FC<Props> = ({title, description, children}) => {
    return (
        <Container>
            {title && <Title>{title}</Title>}

            {description && <Description>{description}</Description>}

            {children}
        </Container>
    );
};

const Container = styled.div`
    margin-bottom: 40px;
`;

const Title = styled.p`
    font-size: 26px;
    padding-bottom: 10px;
`;

const Description = styled.p`
    margin-bottom: 16px;
`;
