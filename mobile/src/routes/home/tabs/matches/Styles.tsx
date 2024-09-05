import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled.View``;

export const List = styled.ScrollView`
    display: flex;
    flex-direction: row;
`;

export const MatchRendererWrapper = styled.Pressable`
    margin-right: 24px;
`;

export const LoadingMatchesContainer = styled(SafeAreaView)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const Centered = styled.View`
    flex-direction: column;
    height: 84%;
    justify-content: center;
`;
