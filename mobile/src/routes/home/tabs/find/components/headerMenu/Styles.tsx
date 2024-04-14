import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';

export const Container = styled(SafeAreaView)`
    position: absolute;
    width: 100%;
`;

export const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    top: 20px;
`;

const {width} = Dimensions.get('window');
const imageWidth = width * 0.1;

export const Image = styled.Image`
    width: ${imageWidth}px;
    height: ${imageWidth}px;
    border-radius: ${imageWidth / 2}px;
`;

export const AvatarWrapper = styled.Pressable`
    position: relative;
`;

export const ActivityIndicatorWrapper = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
