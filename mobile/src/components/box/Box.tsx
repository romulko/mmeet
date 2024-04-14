import styled, {css} from 'styled-components/native';
import {FC} from 'react';

interface Props {
    dir?: 'row' | 'column';
    children?: any;
    alignItems?: 'flex-start' | 'center' | 'flex-end';
    justifyContent?: 'flex-start' | 'center' | 'space-between' | 'flex-end';
}

export const Box: FC<Props> = ({
    dir = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    children,
}) => {
    const getContent = () => {
        if (dir === 'column') {
            return <Wrapper>{children}</Wrapper>;
        }

        return children;
    };
    return (
        <Container
            dir={dir}
            alignItems={alignItems}
            justifyContent={justifyContent}>
            {getContent()}
        </Container>
    );
};

const Container = styled.View<Props>`
    ${({dir, alignItems, justifyContent}) => {
        let myCss;
        if (dir === 'row') {
            myCss = css`
                align-items: ${alignItems};
                justify-content: ${justifyContent};
            `;
        } else {
            myCss = css`
                flex: 1;
                align-items: ${justifyContent};
                justify-content: ${alignItems};
            `;
        }

        return css`
            flex-direction: ${dir};
            ${myCss};
        `;
    }}
`;

const Wrapper = styled.View`
    width: 100%;
`;
