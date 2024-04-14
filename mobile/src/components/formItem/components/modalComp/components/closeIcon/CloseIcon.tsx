import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const CloseIcon = () => {
    return (
        <Svg width="30" height="30" viewBox="0 0 200 200" fill="none">
            <Circle cx="100" cy="100" r="100" fill="#D9D9D9" />
            <Path
                d="M65 65L135.711 135.711"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
            />
            <Path
                d="M65 135.711L135.711 65"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
            />
        </Svg>
    );
};
