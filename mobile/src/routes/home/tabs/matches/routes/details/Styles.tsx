import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const partnerImageHeight = height * 0.5;

export const PartnerImage = styled.Image`
    height: ${partnerImageHeight}px;
    border-radius: 20px;
`;

export const PartnerName = styled.Text`
    font-size: 28px;
`;

export const ContentContainer = styled.View`
    padding: 0 10px;
`;
