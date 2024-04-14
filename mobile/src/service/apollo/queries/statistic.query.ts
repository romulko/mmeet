import {gql} from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inviteFriendStatistic = gql`
    query inviteFriendStatistic {
        inviteFriendStatistic {
            invitedUsers {
                id
                name
                invitedCount
                meetingsCount
            }
        }
    }
`;
