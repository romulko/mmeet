import styled, {css} from 'styled-components/native';
import {Props} from './Spacer';

const variantToSizeMap = {
    default: 0,
    h1: 40,
    h2: 20,
    h3: 10,
    h4: 6,
};

export const Container = styled.View<Props>`
    ${({width, height, hVariant, wVariant}) => css`
        width: ${width ? width : variantToSizeMap[wVariant || 'default']}px;
        height: ${height ? height : variantToSizeMap[hVariant || 'default']}px;
    `};
`;
