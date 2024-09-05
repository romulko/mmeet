import {useSetRecoilState} from 'recoil';
import {nextButtonEnabledState} from '../../../state/nextButtonEnabled.state';
import {useFocusEffect} from '@react-navigation/native';
import {useEffect} from 'react';

export const useUpdateEnabled = (value: any) => {
    const setNextButtonEnabled = useSetRecoilState(nextButtonEnabledState);

    useFocusEffect(() => {
        setNextButtonEnabled(!!value);
    });

    useEffect(() => {
        setNextButtonEnabled(!!value);
    }, [setNextButtonEnabled, value]);
};
