import React, {FC} from 'react';
import {Player} from './Styles';
import {OnProgressData} from 'react-native-video';

interface Props {
    uri: string;
    useControls?: boolean;
    onProgress?: (data: OnProgressData) => void;
}

export const VideoPlayer: FC<Props> = ({
    uri,
    useControls = false,
    onProgress,
}) => {
    return (
        <Player
            progressUpdateInterval={1000}
            onProgress={onProgress}
            ignoreSilentSwitch="ignore"
            source={{
                uri,
            }}
            controls={useControls}
        />
    );
};
