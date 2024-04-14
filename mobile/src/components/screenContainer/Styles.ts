import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ContentContainer = styled(SafeAreaView)`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Wrapper = styled.View`
    height: 100%;
    padding: 20px 20px 0 20px;
`;

export const ScrollableWrapper = styled.ScrollView`
    height: 100%;
    padding: 20px 20px 0 20px;
`;
