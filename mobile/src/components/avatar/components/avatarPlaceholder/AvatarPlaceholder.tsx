import React from 'react';
import Svg, {Circle, G, Path, Rect} from 'react-native-svg';
import {Dimensions} from 'react-native';

const width = Math.round(Dimensions.get('screen').width * 0.9);

export const AvatarPlaceholder = () => {
    return (
        <Svg width={width} height={width} viewBox="0 0 336 336" fill="none" >
            <G filter="url(#filter0_d_119_2263)">
                <Rect
                    x="9.5"
                    y="9.5"
                    width="317"
                    height="317"
                    rx="16.5"
                    stroke="#FEECC0"
                    stroke-width="3"
                />
                <Circle cx="167.727" cy="135.727" r="55" fill="#FEECC0"/>
                <Path d="M167.182 209.516C111.711 207.789 81.4634 254.151 73.2737 277.548C158.009 346.227 235.247 306.164 263.274 277.548C260.544 267.289 236.521 211.676 167.182 209.516Z" fill="#FEECC0"/>
            </G>
        </Svg>

    );
};

