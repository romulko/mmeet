import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export const OptionIcon = () => {
    return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <Circle cx="15" cy="15" r="15" fill="#7A7A7A" fill-opacity="0.2" />
            <Path
                d="M5 8.04883H25M5 15.1761H25M5 22.0488H25"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
            />
            <Rect
                x="20.7898"
                y="12.5503"
                width="1.93237"
                height="4.39771"
                rx="0.5"
                fill="white"
            />
            <Rect
                x="10.9141"
                y="6"
                width="1.93237"
                height="4.39771"
                rx="0.5"
                fill="white"
            />
            <Rect
                x="8.33789"
                y="20.1011"
                width="1.93237"
                height="4.39771"
                rx="0.5"
                fill="white"
            />
        </Svg>
    );
};
