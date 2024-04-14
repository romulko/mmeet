import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Props} from './Avatar';

const width = Dimensions.get('screen').width;

const sizes = {
    small: Math.round(width * 0.1),
    h2: Math.round(width * 0.15),
    medium: Math.round(width * 0.36),
    big: Math.round(width * 0.9),
    fullScreen: width,
};

export const Container = styled.Pressable`
    position: relative;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.Image<Pick<Props, 'variant' | 'allowEdit'>>`
    ${({variant}) => {
        let size = sizes[variant!];

        let height = size;
        let borderRadius = 0;
        if (variant === 'fullScreen') {
            height = size * 1.7;
        } else {
            borderRadius = variant === 'big' ? 12 : Math.round(size / 2);
        }

        return css`
            width: ${size}px;
            height: ${height}px;
            border-radius: ${borderRadius}px;
        `;
    }}
`;

export const LoadingLabelWrapper = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
