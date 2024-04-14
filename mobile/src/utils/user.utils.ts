import {GenderType} from '../service/apollo/generated';
import i18n from '../service/i18n';

export const getAge = (birthday: string) => {
    const now = new Date();
    return now.getFullYear() - new Date(birthday).getFullYear();
};

export const getHeShe = (gender: GenderType) => {
    const heShe = gender === GenderType.Male ? 'he' : 'she';

    return i18n.getResource(i18n.language, 'translation', `heShe.${heShe}`);
};

export const getHisHer = (gender: GenderType) => {
    const hisHer = gender === GenderType.Male ? 'his' : 'her';

    return i18n.getResource(i18n.language, 'translation', `hisHer.${hisHer}`);
};
