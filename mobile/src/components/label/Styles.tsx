import styled from 'styled-components/native';
import {Props} from './Label';

const variantToSize = {
    h1: 24,
    h2: 20,
    h3: 18,
    h4: 16,
};

const colorToColor = {
    black: '#2C3017',
    gray: '#808080',
    superGray: '#E4E4E4',
    white: 'white',
    success: '#04c010',
};

export const Text = styled.Text<Omit<Props, 'children'>>`
    font-size: ${({variant}) => `${variantToSize[variant!]}px`};
    color: ${({color}) => `${colorToColor[color!]}`};
    text-align: ${({centered}) => (centered ? 'center' : 'left')};
    font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;
