import i18n from '../service/i18n';

export const getDateFormatted = (input?: Date | string) => {
    if (!input) {
        return '';
    }

    const date: Date = typeof input === 'string' ? new Date(input) : input;

    return date.toLocaleDateString(i18n.language);
};

export const getTimeFormatted = (input?: Date | string) => {
    if (!input) {
        return '';
    }

    const date: Date = typeof input === 'string' ? new Date(input) : input;

    const hours = toDoubleNumber(date.getHours().toString());
    const minutes = toDoubleNumber(date.getMinutes().toString());

    return `${hours}:${minutes}`;
};

export const getDateTimeFormatted = (input?: Date | string) => {
    if (!input) {
        return '';
    }

    return `${getDateFormatted(input)} ${getTimeFormatted(input)}`;
};

const toDoubleNumber = (input: string) => {
    return input.length === 1 ? `0${input}` : input;
};
