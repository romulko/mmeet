import styled from 'styled-components/native';
import DropShadow from 'react-native-drop-shadow';

export const ModalContainer = styled.View`
    height: 100%;
`;

export const ModalContentContainer = styled(DropShadow)`
    height: 90%;
    background-color: white;
    shadow-color: back;
    shadow-opacity: 0.2;
    shadow-radius: 12px;
    border-radius: 12px;
    padding: 20px;
`;

export const HeaderContainer = styled.View`
    justify-content: space-between;
`;

export const TouchableBackground = styled.Pressable`
    height: 10%;
`;

export const TouchableBackgroundChild = styled.View`
    height: 100%;
    opacity: 0.9;
    background-color: white;
`;

export const LabelWrapper = styled.Pressable``;
