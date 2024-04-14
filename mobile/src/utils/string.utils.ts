export const toFirstUpperLetter = (value: any) => {
    if (!value) {
        return '';
    }

    const str = value.toString();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
