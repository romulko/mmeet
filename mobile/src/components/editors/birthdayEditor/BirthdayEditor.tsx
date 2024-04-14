import React, {FC, useEffect, useRef} from 'react';
import {useUserUpdateBirthdayMutation} from '../../../service/apollo/generated';
import {DatePickerChooser} from '../../datePickerChooser';
import {useMe} from '../../../state/useMe';
import {birthdayToZodiacSign} from './utils/birthdayToZodiacSign.utils';
import {FormItemEditorProps} from '../../formItem';

interface Props {
    saveImmediately?: boolean;
}

export const BirthdayEditor: FC<FormItemEditorProps & Props> = ({
    closeModal,
    saveImmediately,
}) => {
    const {me} = useMe();
    const [userUpdateBirthdayMutation] = useUserUpdateBirthdayMutation();
    const openedRef = useRef(false);

    useEffect(() => {
        openedRef.current = false;
    }, []);

    const dateChangeHandler = (birthday: Date) => {
        userUpdateBirthdayMutation({
            variables: {userBirthdayInput: {birthday}},
            optimisticResponse: {
                userUpdateBirthday: {
                    id: me.id,
                    birthday,
                    zodiacSign: birthdayToZodiacSign(birthday),
                    __typename: 'User',
                },
            },
        });

        closeModal && closeModal();
    };

    return (
        <DatePickerChooser
            saveImmediately={saveImmediately}
            opened={openedRef.current}
            selectedDate={
                me.birthday
                    ? new Date(me.birthday)
                    : new Date(1990, 0, 1, 15, 0)
            }
            onDateChange={dateChangeHandler}
            onSavePressed={dateChangeHandler}
        />
    );
};
