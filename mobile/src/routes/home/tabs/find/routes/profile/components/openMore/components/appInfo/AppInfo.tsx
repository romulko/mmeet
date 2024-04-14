import React from 'react';
import {Label} from '../../../../../../../../../../components/label';
import DeviceInfo from 'react-native-device-info';
import {useMe} from '../../../../../../../../../../state/useMe';

export const AppInfo = () => {
    const {me} = useMe();

    return (
        <Label color="superGray" centered variant="h4">
            {DeviceInfo.getReadableVersion()}, {me.id}
        </Label>
    );
};
