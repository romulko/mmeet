import styled from 'styled-components/native';
import {Props} from './Container';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
`;

export const Wrapper = styled.View<Props>`
    align-items: center;
    justify-content: ${({centered}) => (centered ? 'center' : 'space-between')};
    width: 100%;
    height: 100%;
    padding: 0 20px;
`;
