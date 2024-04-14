import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    background-color: #31322b;
    height: 100%;
`;

export const BackButtonWrapper = styled.View`
    padding-left: 20px;
    padding-top: 20px;
`;

export const ContentContainer = styled.View`
    margin-top: 80px;
    padding: 20px;
    height: 100%;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;
