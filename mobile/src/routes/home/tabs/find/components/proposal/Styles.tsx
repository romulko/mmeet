import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const Container = styled(SafeAreaView)`
    width: ${screenWidth}px;
    height: ${screenHeight}px;
`;

export const NoProposalsContainer = styled(SafeAreaView)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const avatarHeight = screenHeight * 0.71;

export const AvatarWrapper = styled.View`
    width: ${screenWidth}px;
    height: ${avatarHeight}px;
    position: relative;
`;

export const AvatarLoaderWrapper = styled.View`
    width: 100%;
    height: ${avatarHeight}px;
    align-items: center;
    justify-content: center;
    position: absolute;
`;

export const Avatar = styled.Image`
    width: ${screenWidth}px;
    height: ${avatarHeight}px;
    border-radius: 20px;
`;

export const PanelContainer = styled.View`
    border-radius: 30px;
    padding: 30px 20px;
    background-color: white;
    height: 100%;
`;

export const ProposalName = styled.Text`
    font-size: 28px;
`;

export const ActionsContainer = styled.View`
    flex-direction: row;
`;
