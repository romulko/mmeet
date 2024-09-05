import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width} = Dimensions.get('window');
const imageWidth = width * 0.3;

export const Image = styled.Image`
    width: ${imageWidth}px;
    height: ${imageWidth}px;
    border-radius: ${imageWidth / 2}px;
`;

export const ImageInvited = styled.Image`
    width: ${imageWidth / 1.6}px;
    height: ${imageWidth / 1.6}px;
    border-radius: ${imageWidth / 2}px;
`;

export const Box = styled.View`
    align-items: center;
`;
