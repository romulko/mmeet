import { ZodiacSign } from '../../entity/user.entity';

export const birthdayToZodiacSign = (birthday: Date) => {
  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  const signs = [
    ZodiacSign.AQUARIUS,
    ZodiacSign.PISCES,
    ZodiacSign.ARIES,
    ZodiacSign.TAURUS,
    ZodiacSign.GEMINI,
    ZodiacSign.CANCER,
    ZodiacSign.LEO,
    ZodiacSign.VIRGO,
    ZodiacSign.LIBRA,
    ZodiacSign.SCORPIUS,
    ZodiacSign.SAGITTARIUS,
    ZodiacSign.CAPRICORNUS,
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
