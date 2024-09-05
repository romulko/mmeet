import React, {FC} from 'react';
import {Button as RNEButton} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

interface Props {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    colorVariant?: 'normal' | 'gray';
    testID?: string;
}

export const Button: FC<Props> = ({
    title,
    onPress,
    disabled,
    colorVariant = 'normal',
    loading,
    testID,
}) => {
    const {t} = useTranslation();
    const buttonStyle = {
        ...styles.buttonStyle,
        backgroundColor: colorVariantToColor[colorVariant],
    };

    return (
        <RNEButton
            title={loading ? t('labels.loading') : title}
            disabled={disabled || loading}
            onPress={onPress}
            buttonStyle={buttonStyle}
            containerStyle={styles.containerStyle}
            testID={testID}
        />
    );
};

const colorVariantToColor = {
    normal: '#F7D550',
    gray: '#c9c9c9',
};

const styles = StyleSheet.create({
    buttonStyle: {minWidth: 100, backgroundColor: '#F7D550'},
    containerStyle: {borderRadius: 10},
});
