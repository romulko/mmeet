import { Question } from '../entity/question.entity';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Ужин',
    questions: [
      {
        id: 11,
        text: 'Если бы вы могли пригласить кого-нибудь на ужин (близкого человека, знаменитость), кого бы вы выбрали?',
      },
      { id: 12, text: 'Что бы вы ему сказали?' },
    ],
  },
  {
    id: 2,
    text: 'Знаменитость',
    questions: [
      { id: 21, text: 'Хотели бы вы быть знаменитым?' },
      { id: 22, text: 'В чем?' },
    ],
  },
  {
    id: 3,
    text: 'Звонок',
    questions: [
      {
        id: 31,
        text: 'Прежде чем сделать звонок, вам случается репетировать свою реплику?',
      },
      { id: 32, text: 'Почему?' },
    ],
  },

  {
    id: 4,
    text: 'Идеальный день',
    questions: [{ id: 41, text: 'Каким был бы для вас «идеальный день»?' }],
  },

  {
    id: 5,
    text: 'Благодарность',
    questions: [
      { id: 51, text: 'За что вы испытываете наибольшую благодарность?' },
    ],
  },

  {
    id: 6,
    text: 'Воспитание',
    questions: [
      {
        id: 61,
        text: 'Если бы вы могли, что бы вы изменили в том, как вас воспитывали?',
      },
    ],
  },

  {
    id: 7,
    text: 'Правда',
    questions: [
      {
        id: 71,
        text: 'Если бы магический кристалл мог открыть вам правду, о чем бы вы хотели узнать?',
      },
    ],
  },

  {
    id: 8,
    text: 'Мечтаете сделать',
    questions: [
      { id: 81, text: 'Есть ли что-то, что вы уже давно мечтаете сделать?' },
      { id: 82, text: 'Почему вы еще не сделали этого?' },
    ],
  },

  {
    id: 9,
    text: 'Достижение жизни',
    questions: [{ id: 91, text: 'Каково наибольшее достижение вашей жизни?' }],
  },

  {
    id: 10,
    text: 'Ценно в дружбе',
    questions: [{ id: 101, text: 'Что в дружбе для вас наиболее ценно?' }],
  },

  {
    id: 11,
    text: 'Дорогое воспоминание',
    questions: [{ id: 111, text: 'Каково ваше самое дорогое воспоминание?' }],
  },

  {
    id: 12,
    text: 'Ужасное воспоминание',
    questions: [{ id: 121, text: 'Каково ваше самое ужасное воспоминание?' }],
  },

  {
    id: 13,
    text: 'Изменить в жизни',
    questions: [
      {
        id: 131,
        text: 'Если бы вы знали, что умрете через год, что бы вы изменили в том, как вы живете?',
      },
      { id: 132, text: 'Почему?' },
    ],
  },
  {
    id: 14,
    text: 'Дружба',
    questions: [{ id: 141, text: 'Что для вас значит дружба?' }],
  },

  {
    id: 15,
    text: 'Взаимодействие с матерью',
    questions: [
      {
        id: 151,
        text: 'Какие чувства у вас вызывает ваше взаимодействие с матерью?',
      },
    ],
  },

  {
    id: 16,
    text: 'C кем можно разделить…',
    questions: [
      {
        id: 161,
        text: 'Продолжите фразу: «Я бы хотел, чтобы был кто-то, с кем можно разделить…»',
      },
    ],
  },
  {
    id: 17,
    text: 'Последний раз плакали',
    questions: [
      { id: 171, text: 'Когда вы в последний раз плакали при ком-нибудь?' },
      { id: 172, text: 'А в одиночестве?' },
    ],
  },

  {
    id: 18,
    text: 'Серьезна, чтобы шутить',
    questions: [
      {
        id: 181,
        text: 'По-вашему, какая тема слишком серьезна, чтобы шутить об этом?',
      },
    ],
  },

  {
    id: 19,
    text: 'Несказанное',
    questions: [
      {
        id: 191,
        text: 'Если бы вы должны были умереть сегодня до конца дня, ни с кем не поговорив, о чем несказанном вы бы больше всего жалели?',
      },
      { id: 192, text: 'Почему вы еще не сказали этого?' },
    ],
  },

  {
    id: 20,
    text: 'Спасти из дома',
    questions: [
      {
        id: 201,
        text: 'Ваш дом со всем имуществом загорелся. После спасения ваших близких, а также домашних животных у вас есть время, чтобы забежать в дом и спасти еще что-то от пламени. Что бы вы взяли?',
      },
      { id: 202, text: 'Почему?' },
    ],
  },

  {
    id: 21,
    text: 'Cценарий',
    questions: [
      {
        id: 211,
        text: 'Если бы в конце жизни вы посмотрели фильм о себе, о чем был бы этот сценарий в трёх предложениях?',
      },
    ],
  },

  {
    id: 22,
    text: 'Не знали про людей',
    questions: [
      {
        id: 221,
        text: 'Что вы не знали про людей и что вас удивило?',
      },
    ],
  },
];
