import React, {FC} from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import styled from 'styled-components/native';

interface Props {
    onPress: () => void;
}

export const BackButton: FC<Props> = ({onPress}) => {
    return (
        <Container onPress={onPress}>
            <Svg width="30" height="30" viewBox="0 0 50 50" fill="none">
                <Circle cx="25" cy="25" r="25" fill="#F2F2F2" />
                <Path
                    d="M14.9393 23.9393C14.3536 24.5251 14.3536 25.4749 14.9393 26.0607L24.4853 35.6066C25.0711 36.1924 26.0208 36.1924 26.6066 35.6066C27.1924 35.0208 27.1924 34.0711 26.6066 33.4853L18.1213 25L26.6066 16.5147C27.1924 15.9289 27.1924 14.9792 26.6066 14.3934C26.0208 13.8076 25.0711 13.8076 24.4853 14.3934L14.9393 23.9393ZM33 23.5L16 23.5L16 26.5L33 26.5L33 23.5Z"
                    fill="#333333"
                />
            </Svg>
        </Container>
    );
};

export const Container = styled.Pressable`
    width: 30px;
    height: 30px;
`;
