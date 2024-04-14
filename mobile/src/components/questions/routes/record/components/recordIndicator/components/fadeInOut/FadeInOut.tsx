import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import {FC} from 'react';

interface Props {
    children: any;
}

export const FadeInOut: FC<Props> = ({children}) => {
    const opacity = useSharedValue(0);

    opacity.value = withRepeat(
        withTiming(1, {duration: 1000, easing: Easing.ease}),
        -1,
        true,
    );

    const style = useAnimatedStyle(() => ({opacity: opacity.value}), []);

    return <Animated.View style={style}>{children}</Animated.View>;
};
