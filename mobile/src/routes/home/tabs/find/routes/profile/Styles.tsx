import styled, {css} from 'styled-components/native';
import DropShadow from 'react-native-drop-shadow';
import {IS_IOS} from '../../../../../../utils/platform.utils';

export const Container = styled.View`
    background-color: #31322b;
`;

export const BackButtonWrapper = styled.View`
    margin-left: 20px;
`;

export const HeaderActionsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: -48px;
    z-index: 10;
`;

export const ImageWrapper = styled(DropShadow)`
    width: 124px;
    height: 124px;
    shadow-color: back;
    shadow-opacity: 0.2;
    shadow-radius: 12px;
    position: relative;
`;

export const ImageLoaderWrapper = styled.View`
    width: 124px;
    height: 124px;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: #fff7ef;
    border-radius: 20px;
`;

export const Image = styled.Image`
    width: 124px;
    height: 124px;
    border-radius: 20px;
    position: absolute;
`;

const VideoStudioButtonCss = css`
    width: 124px;
    height: 124px;
    border: 1px solid #d5d5d5;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

let VideoStudioButtonIOS: any;
let VideoStudioButtonAndroid: any;

if (IS_IOS) {
    VideoStudioButtonIOS = styled(DropShadow)`
        ${VideoStudioButtonCss};
        shadow-color: back;
        shadow-opacity: 0.2;
        shadow-radius: 12px;
    `;
} else {
    VideoStudioButtonAndroid = styled.View`
        ${VideoStudioButtonCss};
        border: 1px solid #d5d5d5;
    `;
}

export const VideoStudioButton = IS_IOS
    ? VideoStudioButtonIOS
    : VideoStudioButtonAndroid;

export const VideoStudioLabel = styled.Text`
    color: #f99a00;
    font-size: 16px;
`;

export const RoundedContent = styled.ScrollView`
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    height: 100%;
    background-color: white;
    padding-top: 80px;
`;

export const Content = styled.View`
    padding: 0 20px;
`;
