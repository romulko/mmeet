import React, {FC} from 'react';
import {ButtonGroup} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {GenderType} from '../../service/apollo/generated';
import {useTranslation} from 'react-i18next';

interface Props {
    selectedGender: GenderType;
    onGenderChange: (gender: GenderType) => void;
}

const genderTypeValues = Object.values(GenderType).reverse();

export const GenderChooser: FC<Props> = ({selectedGender, onGenderChange}) => {
    const {t} = useTranslation();

    const buttonGroupPressHandler = (value: any) => {
        onGenderChange(genderTypeValues[value]);
    };

    const buttons = genderTypeValues.map(value =>
        t(`labels.gender.${value.toLowerCase()}`),
    );

    return (
        <ButtonGroup
            selectedButtonStyle={buttonGroupStyles.selectedButtonStyle}
            innerBorderStyle={buttonGroupStyles.innerBorderStyle}
            containerStyle={buttonGroupStyles.containerStyle}
            textStyle={buttonGroupStyles.textStyle}
            buttons={buttons}
            selectedIndex={genderTypeValues.indexOf(selectedGender)}
            onPress={buttonGroupPressHandler}
        />
    );
};

const buttonGroupStyles = StyleSheet.create({
    selectedButtonStyle: {
        backgroundColor: '#F99A00',
        borderRadius: 10,
    },
    containerStyle: {borderWidth: 0, height: 40},
    innerBorderStyle: {width: 0},
    textStyle: {fontSize: 20},
});
