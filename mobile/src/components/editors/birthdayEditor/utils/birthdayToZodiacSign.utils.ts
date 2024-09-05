import {ZodiacSign} from '../../../../service/apollo/generated';

export const birthdayToZodiacSign = (birthday: Date) => {
    const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
    const signs = [
        ZodiacSign.Aquarius,
        ZodiacSign.Pisces,
        ZodiacSign.Aries,
        ZodiacSign.Taurus,
        ZodiacSign.Gemini,
        ZodiacSign.Cancer,
        ZodiacSign.Leo,
        ZodiacSign.Virgo,
        ZodiacSign.Libra,
        ZodiacSign.Scorpius,
        ZodiacSign.Sagittarius,
        ZodiacSign.Capricornus,
    ];

    let month = birthday.getMonth();
    const day = birthday.getDate();

    if (month === 0 && day <= 20) {
        month = 11;
    } else if (day < days[month]) {
        month--;
    }

    return signs[month];
};
