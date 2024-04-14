import {useReactiveVar} from '@apollo/client';
import {isVideoProcessingState} from '../../../../../../../../../../../service/fcm';
import {useMe} from '../../../../../../../../../../../state/useMe';
import {useCallback, useEffect} from 'react';
import {SERVER_URL} from '../../../../../../../../../../../service/consts/consts';

export const useCheckServerHasProcessing = () => {
    const {me} = useMe();

    const serverHasProcessing = useReactiveVar(isVideoProcessingState);

    const triggerServerCheck = useCallback(() => {
        fetch(`${SERVER_URL}/questions/isVideoProcessing/${me.id}`)
            .then(value => value.text())
            .then(value => isVideoProcessingState(value === 'true'));
    }, [me]);

    useEffect(() => {
        triggerServerCheck();
    }, [triggerServerCheck]);

    return {serverHasProcessing};
};
