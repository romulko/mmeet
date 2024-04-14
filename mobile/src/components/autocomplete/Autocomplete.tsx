import React, {FC, useEffect, useRef} from 'react';
import {
    DescriptionRow,
    GooglePlaceData,
    GooglePlacesAutocomplete,
    GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {StyleSheet, TextInputProps} from 'react-native';
import {AUTOCOMPLETE_KEY} from '../../service/consts/consts';
import {useTranslation} from 'react-i18next';

interface Props {
    placeholder?: string | null;
    onSelected: (placeId: string, city: string, country: string) => void;
    type?: 'address' | '(cities)';
}

export const Autocomplete: FC<Props> = ({
    placeholder,
    onSelected,
    type = 'address',
}) => {
    const {
        i18n: {language},
    } = useTranslation();
    const ref = useRef<GooglePlacesAutocompleteRef | null>();

    // set focus on modal
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        ref.current.focus();
    }, []);

    const googlePlacesAutocompletePressHandler = (
        googlePlaceData: GooglePlaceData,
    ) => {
        const {place_id, terms} = googlePlaceData as DescriptionRow;

        const city = `${terms[0].value}, ${terms[1].value}`;
        const country = terms[terms.length - 1].value;

        onSelected(place_id, city, country);
    };

    return (
        <GooglePlacesAutocomplete
            ref={instance => (ref.current = instance)}
            styles={styles}
            debounce={400}
            placeholder={placeholder || 'Search'}
            textInputProps={textInputProps}
            onPress={googlePlacesAutocompletePressHandler}
            query={{key: AUTOCOMPLETE_KEY, language: language || 'en', type}}
        />
    );
};

const styles = StyleSheet.create({
    row: {paddingLeft: 0},
    textInput: {marginLeft: -12, fontSize: 24},
});

const textInputProps: TextInputProps = {
    placeholderTextColor: 'black',
};
