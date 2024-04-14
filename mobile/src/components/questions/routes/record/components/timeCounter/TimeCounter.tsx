import React, {useEffect, useRef, useState} from 'react';
import {Label} from '../../../../../label';

export const TimeCounter = () => {
    const [time, setTime] = useState('00:00');
    const startedTime = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            const diffTime = Math.floor((now - startedTime.current) / 1000);

            const minutes = Math.floor(diffTime / 60) % 60;
            const seconds = diffTime % 60;

            const secondsStr = seconds.toString();
            const minutesStr = minutes.toString();

            setTime(
                `${minutesStr.length === 1 ? `0${minutesStr}` : minutesStr}:${
                    secondsStr.length === 1 ? `0${secondsStr}` : secondsStr
                }`,
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <Label color="gray">{time}</Label>;
};
