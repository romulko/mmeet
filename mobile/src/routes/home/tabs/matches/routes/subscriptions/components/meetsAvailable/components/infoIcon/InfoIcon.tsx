import Svg, {Circle, Path} from 'react-native-svg';

export const InfoIcon = () => {
    return (
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Circle
                cx="12.7897"
                cy="12.4229"
                r="11.5"
                fill="white"
                stroke="#FDCA4B"
            />
            <Path
                d="M13.2946 10.498V18.4229H11.9323V10.498H13.2946ZM11.8297 8.396C11.8297 8.17627 11.8956 7.99072 12.0275 7.83936C12.1642 7.68799 12.3644 7.6123 12.6281 7.6123C12.8868 7.6123 13.0846 7.68799 13.2213 7.83936C13.3629 7.99072 13.4337 8.17627 13.4337 8.396C13.4337 8.60596 13.3629 8.78662 13.2213 8.93799C13.0846 9.08447 12.8868 9.15771 12.6281 9.15771C12.3644 9.15771 12.1642 9.08447 12.0275 8.93799C11.8956 8.78662 11.8297 8.60596 11.8297 8.396Z"
                fill="#F99A00"
            />
        </Svg>
    );
};
