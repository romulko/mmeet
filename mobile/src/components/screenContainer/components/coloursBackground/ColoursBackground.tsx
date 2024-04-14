import {Image, ImageWrapper} from './Styles';
import {Dimensions} from 'react-native';
import {memo} from 'react';
import {FadeInOut} from './components/fadeInOut';

const colors: {name: string; image: any}[] = [
    {
        name: 'blue',
        image: require('./images/blue.png'),
    },
    {
        name: 'green',
        image: require('./images/green.png'),
    },
    {
        name: 'indigo',
        image: require('./images/indigo.png'),
    },
    {
        name: 'orange',
        image: require('./images/orange.png'),
    },
    {
        name: 'red',
        image: require('./images/red.png'),
    },
    {
        name: 'violet',
        image: require('./images/violet.png'),
    },
    {
        name: 'yellow',
        image: require('./images/yellow.png'),
    },
];

export const ColoursBackground = memo(() => {
    return (
        <>
            {colors.map(value => {
                const x = getX();
                const y = getY();

                return (
                    <ImageWrapper key={value.name} left={x} top={y}>
                        <FadeInOut>
                            <Image source={value.image} />
                        </FadeInOut>
                    </ImageWrapper>
                );
            })}
        </>
    );
});

const {width, height} = Dimensions.get('window');

const getX = () => {
    return Math.round(Math.random() * width - 50);
};

const getY = () => {
    return Math.round(Math.random() * height - 50);
};
