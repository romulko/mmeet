import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.View``;

const screenWidth = Dimensions.get('screen').width;

const matchImageHeight = screenWidth * 0.56;
const dateImageHeight = screenWidth * 0.36;
const correlation = 0.74;

const imageVariantToSize = {
    match: {
        width: matchImageHeight * correlation,
        height: matchImageHeight,
    },
    date: {
        width: dateImageHeight * correlation,
        height: dateImageHeight,
    },
};

export const Image = styled.Image<{variant: 'match' | 'date'}>`
    ${({variant}) => {
        const {width, height} = imageVariantToSize[variant];

        return css`
            width: ${width}px;
            height: ${height}px;
        `;
    }}
    border-radius: 20px;
`;

export const DateLabel = styled.Text`
    color: gray;
    font-size: 14px;
    margin-top: 4px;
`;
