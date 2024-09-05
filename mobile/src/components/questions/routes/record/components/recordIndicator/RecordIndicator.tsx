import React from 'react';
import {RecordIndicator as RecordIndicatorStyled} from './Styles';
import {FadeInOut} from './components/fadeInOut';

export const RecordIndicator = () => {
    return (
        <FadeInOut>
            <RecordIndicatorStyled />
        </FadeInOut>
    );
};
