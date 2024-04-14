import {Label} from '../../../../../../../../../../../components/label';
import {View} from 'react-native';
import React, {FC} from 'react';
import {Spacer} from '../../../../../../../../../../../components/spacer';

interface Props {
    label: string;
    selected?: boolean;
}

export const ZodiacSignRenderer: FC<Props> = ({label, selected}) => {
    return (
        <View>
            <Label variant="h2" bold={selected}>
                {label}
            </Label>

            <Spacer hVariant="h2" />
            <Spacer hVariant="h4" />
        </View>
    );
};
