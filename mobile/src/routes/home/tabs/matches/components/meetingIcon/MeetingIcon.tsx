import Svg, {Path} from 'react-native-svg';
import {FC} from 'react';

interface Props {
    variant?: 'small' | 'big';
}

export const MeetingIcon: FC<Props> = ({variant = 'small'}) => {
    const {width, height} = variantToSize[variant];

    return (
        <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
            <Path
                d="M26.3376 3.62549H33.3376C33.8018 3.62549 34.2469 3.80986 34.5751 4.13805C34.9033 4.46624 35.0876 4.91136 35.0876 5.37549V33.3755C35.0876 33.8396 34.9033 34.2847 34.5751 34.6129C34.2469 34.9411 33.8018 35.1255 33.3376 35.1255H1.83765C1.37352 35.1255 0.928398 34.9411 0.60021 34.6129C0.272021 34.2847 0.0876465 33.8396 0.0876465 33.3755V5.37549C0.0876465 4.91136 0.272021 4.46624 0.60021 4.13805C0.928398 3.80986 1.37352 3.62549 1.83765 3.62549H8.83765V0.125488H12.3376V3.62549H22.8376V0.125488H26.3376V3.62549ZM31.5876 17.6255H3.58765V31.6255H31.5876V17.6255ZM22.8376 7.12549H12.3376V10.6255H8.83765V7.12549H3.58765V14.1255H31.5876V7.12549H26.3376V10.6255H22.8376V7.12549ZM7.08765 21.1255H10.5876V24.6255H7.08765V21.1255ZM15.8376 21.1255H19.3376V24.6255H15.8376V21.1255ZM24.5876 21.1255H28.0876V24.6255H24.5876V21.1255Z"
                fill="#FEE505"
            />
        </Svg>
    );
};

const variantToSize = {
    small: {
        width: 23,
        height: 23,
    },
    big: {
        width: 35,
        height: 35,
    },
};
