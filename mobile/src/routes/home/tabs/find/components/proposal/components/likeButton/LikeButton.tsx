import Svg, {G, Path} from 'react-native-svg';
import styled from 'styled-components/native';
import React from 'react';

export const LikeButton = () => {
    return (
        <Container>
            <Heart />
        </Container>
    );
};

const Container = styled.View`
    background-color: #f99a00;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

const Heart = () => (
    <Svg width={48} height={45} viewBox="0 0 48 45" fill="none">
        <G filter="url(#filter0_d_154_3174)">
            <Path
                d="M11.4269 25.396C11.4269 25.396 22.0893 37.4372 24.1309 37.4372C26.1726 37.4372 36.835 25.396 36.835 25.396C38.933 22.6594 40.4643 20.7932 40.4643 17.6117C40.4643 12.2409 36.3989 7.88159 31.3903 7.88159C28.4233 7.88159 25.7822 9.41936 24.1309 11.7838C22.4796 9.41936 19.8385 7.88159 16.8716 7.88159C11.863 7.88159 7.79761 12.2409 7.79761 17.6117C7.79761 20.7932 9.32886 22.6594 11.4269 25.396Z"
                fill="white"
            />
        </G>
    </Svg>
);
