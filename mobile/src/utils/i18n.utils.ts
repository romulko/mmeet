type LanguageToLabelMapType = {
    [key: string]: string;
};

export const languageToLabelMap: LanguageToLabelMapType = {
    en: 'English',
    // ru: 'Русский',
    uk: 'Українська',
};

export const languageToLabel = (language?: any) => {
    if (!language) {
        return languageToLabelMap.en;
    }

    return languageToLabelMap[language];
};
