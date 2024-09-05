import React, {FC} from 'react';
import {Text} from './Styles';
import {TextProps} from 'react-native';

export interface Props extends TextProps {
    children: any;
    variant?: 'h1' | 'h2' | 'h3' | 'h4';
    color?: 'black' | 'gray' | 'superGray' | 'white' | 'success';
    centered?: boolean;
    bold?: boolean;
}

export const Label: FC<Props> = ({
    children,
    variant = 'h2',
    color = 'black',
    centered,
    bold,
    ...rest
}) => {
    return (
        <Text
            variant={variant}
            color={color}
            centered={centered}
            bold={bold}
            {...rest}>
            {children}
        </Text>
    );
};
