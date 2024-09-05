import React, {FC} from 'react';
import {Container} from './Styles';

export interface Props {
    width?: number;
    height?: number;
    wVariant?: 'h1' | 'h2' | 'h3' | 'h4';
    hVariant?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const Spacer: FC<Props> = props => {
    return <Container {...props} />;
};
