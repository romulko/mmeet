import { Question } from '../entity/question.entity';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Вечеря',
    questions: [
      {
        id: 11,
        text: 'Якщо б ви могли запросити когось на вечерю (близьку людину, померлого родича, знаменитість), хто б це був?',
      },
      { id: 12, text: 'Що б ви цій людині сказали?' },
    ],
  },
  {
    id: 2,
    text: 'Знаменитість',
    questions: [
      { id: 21, text: 'Хотіли б ви бути знаменитими?' },
      { id: 22, text: 'В чому?' },
    ],
  },
  {
    id: 3,
    text: 'Дзвінок',
    questions: [
      {
        id: 31,
        text: 'Перед тим як зробити дзвінок - ви тренуєте свою репліку?',
      },
      { id: 32, text: 'Чому?' },
    ],
  },

  {
    id: 4,
    text: 'Ідеальний день',
    questions: [{ id: 41, text: 'Яким є для вас ідеальний день?' }],
  },

  {
    id: 5,
    text: 'Вдячність',
    questions: [{ id: 51, text: 'За що ви відчуваєте найбільшу вдячність?' }],
  },

  {
    id: 6,
    text: 'Виховання',
    questions: [
      {
        id: 61,
        text: 'Якщо б ви могли, що б ви змінили в тому як вас виховували?',
      },
    ],
  },

  {
    id: 7,
    text: 'Правда',
    questions: [
      {
        id: 71,
        text: 'Якщо б магічний кристал міг відкрити вам правду, про що ви хотіли довідатись?',
      },
    ],
  },

  {
    id: 8,
    text: 'Мрієте зробити',
    questions: [
      { id: 81, text: 'Чи є щось, що ви давно мрієте зробити?' },
      { id: 82, text: 'Чому ви ще це не зробили?' },
    ],
  },

  {
    id: 9,
    text: 'Досягнення в житті',
    questions: [{ id: 91, text: 'Яке найбільше досягнення у вашому житті?' }],
  },

  {
    id: 10,
    text: 'Цінно в дружбі',
    questions: [{ id: 101, text: 'Що в дружбі для вас є найбільш цінно?' }],
  },

  {
    id: 11,
    text: 'Найдорожчий спогад',
    questions: [{ id: 111, text: 'Розкажіть про свій найдорожчий спогад' }],
  },

  {
    id: 12,
    text: 'Найжахливіший спогад',
    questions: [{ id: 121, text: 'Розкажіть про свій найжахливіший спогад' }],
  },

  {
    id: 13,
    text: 'Змінити в житті',
    questions: [
      {
        id: 131,
        text: 'Якщо б ви знали, що помрете через рік - що б ви змінили в тому як ви живете?',
      },
      { id: 132, text: 'Чому?' },
    ],
  },
  {
    id: 14,
    text: 'Дружба',
    questions: [{ id: 141, text: 'Що для вас значить дружба?' }],
  },

  {
    id: 15,
    text: "Взаємодія з матір'ю",
    questions: [
      {
        id: 151,
        text: "Які почуття у вас викликає ваша взаємодія з матір'ю?",
      },
    ],
  },

  {
    id: 16,
    text: 'З ким можна розділити…',
    questions: [
      {
        id: 161,
        text: 'Продовжіть фразу: «Я б хотів, щоб був хтось, з ким можна розділити…»',
      },
    ],
  },
  {
    id: 17,
    text: 'Востаннє плакали',
    questions: [
      { id: 171, text: 'Коли ви востаннє плакали при комусь?' },
      { id: 172, text: 'А на самоті?' },
    ],
  },

  {
    id: 18,
    text: 'Серйозно, щоб жартувати',
    questions: [
      {
        id: 181,
        text: 'На вашу думку, яка тема занадто серйозна, щоб жартувати про це?',
      },
    ],
  },

  {
    id: 19,
    text: 'Не сказане',
    questions: [
      {
        id: 191,
        text: 'Якби ви мали померти сьогодні до кінця дня, ні з ким не поговоривши, про що не сказане ви б найбільше шкодували?',
      },
      { id: 192, text: 'Чому ви ще не сказали це?' },
    ],
  },

  {
    id: 20,
    text: 'Врятувати з дому',
    questions: [
      {
        id: 201,
        text: "Ваш будинок з усім майном спалахнув. Після порятунку ваших близьких, а також домашніх тварин, у вас є час, щоб забігти в будинок і врятувати ще щось від полум'я. Що б ви взяли?",
      },
      { id: 202, text: 'Чому?' },
    ],
  },

  {
    id: 21,
    text: 'Cценарій',
    questions: [
      {
        id: 211,
        text: 'Якщо б в кінці життя ви подивились фільм про себе, про що був би цей сценарій у трьох реченнях?',
      },
    ],
  },

  {
    id: 22,
    text: 'Не знали про людей',
    questions: [
      {
        id: 221,
        text: 'Що ви не знали про людей і що вас здивувало?',
      },
    ],
  },
];
