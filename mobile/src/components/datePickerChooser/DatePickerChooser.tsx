import React, {FC, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Label} from '../label';
import {Line} from './Styles';
import {Pressable} from 'react-native';
import {Spacer} from '../spacer';
import {useTranslation} from 'react-i18next';
import {IS_IOS} from '../../utils/platform.utils';
import {Button} from '../button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/*
For android - we store date into local state and pass this value on press "Save" button.

For ios - we immediately pass the value.
 */

interface Props {
    mode?: DatePicker['props']['mode'];
    selectedDate?: Date;
    onDateChange: (newDate: Date) => void;
    onSavePressed?: (newDate: Date) => void;
    opened?: boolean;
    label?: string;
    saveImmediately?: boolean;
}

export const DatePickerChooser: FC<Props> = ({
    mode = 'date',
    selectedDate,
    onDateChange,
    onSavePressed,
    opened,
    label = 'Birthday',
    saveImmediately,
}) => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(opened);
    const [title, setTitle] = useState('Select');
    const {i18n} = useTranslation();
    const [date, setDate] = useState(() => selectedDate || new Date());

    useEffect(() => {
        if (!selectedDate) {
            return;
        }

        setTitle(
            mode === 'date'
                ? new Date(selectedDate).toLocaleDateString()
                : new Date(selectedDate).toLocaleString(),
        );
    }, [selectedDate, mode]);

    const dateChangeHandler = (newDate: Date) => {
        onDateChange(newDate);
    };

    const savePressHandler = () => {
        onSavePressed && onSavePressed(date);
    };

    const datePickerChangeHandler = (date: Date) => {
        setDate(date);

        if (saveImmediately) {
            onSavePressed && onSavePressed(date);
        }
    };

    const getContent = () => {
        if (IS_IOS) {
            return (
                <>
                    <Pressable onPress={() => setOpen(true)}>
                        <Label
                            variant="h1"
                            color={selectedDate ? 'black' : 'superGray'}>
                            {title}
                        </Label>

                        <Spacer hVariant="h4" />

                        <Line />
                    </Pressable>

                    <DatePicker
                        modal
                        title={label}
                        locale={i18n.language}
                        mode={mode}
                        open={open}
                        date={selectedDate || new Date()}
                        onConfirm={newDate => {
                            setOpen(false);
                            dateChangeHandler(newDate);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </>
            );
        } else {
            return (
                // <DateTimePickerModal
                //     isVisible
                //     mode="datetime"
                //     date={date}
                //     onConfirm={setDate}
                //     onCancel={() => {}}
                // />

                <>
                    <DatePicker
                        title={label}
                        locale={i18n.language}
                        mode={mode}
                        date={date}
                        onDateChange={datePickerChangeHandler}
                    />

                    <Spacer hVariant="h2" />

                    {!saveImmediately && (
                        <Button
                            title={t('buttons.save')}
                            onPress={savePressHandler}
                        />
                    )}
                </>
            );
        }
    };

    return getContent();
};
