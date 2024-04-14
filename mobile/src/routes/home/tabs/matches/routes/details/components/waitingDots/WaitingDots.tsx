import Svg, {Circle} from 'react-native-svg';
import {Box} from '../../../../../../../../components/box';

export const WaitingDots = () => {
    return (
        <Box>
            <Svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                <Circle cx="5.03906" cy="5.26807" r="5" fill="#D9D9D9" />
            </Svg>

            <Svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                <Circle cx="5.03906" cy="5.26807" r="5" fill="#D9D9D9" />
            </Svg>

            <Svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                <Circle cx="5.03906" cy="5.26807" r="5" fill="#D9D9D9" />
            </Svg>
        </Box>
    );
};
