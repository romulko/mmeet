import styled, {css} from 'styled-components/native';
import DropShadow from 'react-native-drop-shadow';
import {IS_IOS} from '../../../../utils/platform.utils';

export const Container = styled.View`
    height: 100%;
    position: relative;
`;

export const CloseIconWrapper = styled.Pressable`
    align-items: flex-end;
`;

export const Background = styled.Pressable`
    height: 100%;
    opacity: 0.94;
    background-color: white;
`;

const ContentContainerCss = css`
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px 20px 60px 20px;
    position: absolute;
    width: 100%;
    height: 86%;
    bottom: 0;
`;

let ContentContainerIOS: any;
let ContentContainerAndroid: any;

if (IS_IOS) {
    ContentContainerIOS = styled(DropShadow)`
        ${ContentContainerCss};
        shadow-color: back;
        shadow-opacity: 0.2;
        shadow-radius: 12px;
    `;
} else {
    ContentContainerAndroid = styled.View`
        ${ContentContainerCss};
        border: 1px solid #d5d5d5;
    `;
}

export const ContentContainer = IS_IOS
    ? ContentContainerIOS
    : ContentContainerAndroid;

export const HeaderContainer = styled.View`
    width: 100%;
    min-height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
