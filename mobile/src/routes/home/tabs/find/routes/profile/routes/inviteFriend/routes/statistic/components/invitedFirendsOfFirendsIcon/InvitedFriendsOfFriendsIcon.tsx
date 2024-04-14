import Svg, {Circle, Line} from 'react-native-svg';

export const InvitedFriendsOfFriendsIcon = () => {
    return (
        <Svg width="21" height="10" viewBox="0 0 21 10" fill="none">
            <Line
                y1="5"
                x2="16"
                y2="5"
                stroke="black"
                stroke-width="2"
                stroke-dasharray="4 4"
            />
            <Circle cx="16" cy="5" r="5" fill="black" />
        </Svg>
    );
};
