import {Container, Image, Label} from './Styles';
import {Spacer} from '../spacer';

export const Logo = () => {
    return (
        <Container>
            <Image source={require('./logo.png')} />

            <Spacer wVariant="h4" />

            <Label>mmeet</Label>
        </Container>
    );
};
