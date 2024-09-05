import {Container, Input, Line} from './Styles';
import {TextInputProps} from 'react-native';
import {FC, forwardRef} from 'react';
import {Spacer} from '../spacer';

export const TextInput: FC<
    TextInputProps & {autoCompleteType?: string; ref?: any}
> = forwardRef((props, ref) => {
    return (
        <Container>
            <Input placeholderTextColor="#AFAFAFFF" {...props} ref={ref} />

            <Spacer hVariant="h4" />

            <Line />
        </Container>
    );
});
