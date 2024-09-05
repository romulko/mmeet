import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const inputHeight = Dimensions.get('screen').height * 0.2;

export const Input = styled.TextInput`
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    padding: 20px;
    height: ${inputHeight}px;
    font-size: 16px;
`;
