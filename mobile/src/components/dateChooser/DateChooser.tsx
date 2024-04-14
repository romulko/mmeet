import React, {FC} from 'react';
import {Label} from '../label';
import {Spacer} from '../spacer';
import {Pressable} from 'react-native';
import {Line} from './Styles';
import {
    AndroidNativeProps,
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface Props {
    label: string;
    value: string;
    date: Date | null | undefined;
    mode?: 'date' | 'time';
    display?: AndroidNativeProps['display'];
    onDateChange: (date: Date) => void;
    hideLabel?: boolean;
    showLineAlways?: boolean;
}

export const DateChooser: FC<Props> = ({
    label,
    value,
    date,
    mode = 'date',
    display = 'spinner',
    onDateChange,
    hideLabel,
    showLineAlways,
}) => {
    const datePickerConfirmHandler = (
        event: DateTimePickerEvent,
        newDate: Date | undefined,
    ) => {
        if (event.type === 'dismissed' || !newDate) {
            return;
        }

        onDateChange(newDate);
    };

    const containerPressHandler = () => {
        const myDate = new Date();
        myDate.setHours(myDate.getHours() + 1);
        myDate.setMinutes(0);

        DateTimePickerAndroid.open({
            value: date ? date : myDate,
            onChange: datePickerConfirmHandler,
            mode,
            is24Hour: true,
            display,
        });
    };

    return (
        <Pressable onPress={containerPressHandler}>
            {!hideLabel && (
                <>
                    <Label color="gray">{label}</Label>

                    <Spacer hVariant="h4" />
                </>
            )}

            {value && <Label>{value}</Label>}

            {(!value || showLineAlways) && (
                <>
                    <Spacer hVariant="h2" />

                    <Line />
                </>
            )}
        </Pressable>
    );
};
