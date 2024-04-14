import {gql} from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questions = gql`
    query questions($input: QuestionsInput!) {
        questions(input: $input) {
            id
            text
            questions {
                id
                text
            }
            answer {
                id
                questionId
                duration
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questionAnswer = gql`
    mutation questionAnswer($input: QuestionAnswerInput!, $video: Upload!) {
        questionAnswer(input: $input, video: $video) {
            id
            questionId
            duration
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questionDeleteAnswer = gql`
    mutation questionDeleteAnswer($input: QuestionDeleteAnswerInput!) {
        questionDeleteAnswer(input: $input) {
            id
            questionId
        }
    }
`;
