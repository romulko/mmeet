import {gql} from '@apollo/client';

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const availableMeetingsPerWeek = gql`
    query availableMeetingsPerWeek {
        availableMeetingsPerWeek {
            count
        }
    }
`;

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const availableMeetingsInThisWeek = gql`
    query availableMeetingsInThisWeek {
        availableMeetingsInThisWeek {
            count
        }
    }
`;
