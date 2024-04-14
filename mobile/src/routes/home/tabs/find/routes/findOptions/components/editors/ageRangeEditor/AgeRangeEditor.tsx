import React, {useState} from 'react';
import {
    UserAgeRangeInput,
    useUserUpdateAgeRangeMutation,
} from '../../../../../../../../../service/apollo/generated';
import {Container} from './Styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Dimensions} from 'react-native';
import {useMe} from '../../../../../../../../../state/useMe';

const width = Dimensions.get('screen').width * 0.9;

export const AgeRangeEditor = () => {
    const {me} = useMe();
    const [values, setValues] = useState(() => {
        const splited = me.ageRange?.split('-') || ['20', '30'];
        return [parseInt(splited[0], 10), parseInt(splited[1], 10)];
    });

    const [userUpdateAgeRangeMutation] = useUserUpdateAgeRangeMutation();

    const multiSliderChangeHandler = (newValues: number[]) => {
        setValues(newValues);

        const userAgeRangeInput: UserAgeRangeInput = {
            from: newValues[0],
            to: newValues[1],
        };

        userUpdateAgeRangeMutation({
            variables: {
                userAgeRangeInput,
            },
            optimisticResponse: {
                userUpdateAgeRange: {
                    ageRange: `${userAgeRangeInput.from}-${userAgeRangeInput.to}`,
                    id: me.id,
                    __typename: 'User',
                },
            },
        });
    };

    return (
        <Container>
            <MultiSlider
                values={values}
                min={18}
                max={90}
                onValuesChangeFinish={multiSliderChangeHandler}
                enableLabel
                sliderLength={width}
                step={1}
            />
        </Container>
    );
};
