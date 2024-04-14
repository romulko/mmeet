import {gql} from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const propose = gql`
    mutation propose($input: MeetingProposeInput!) {
        propose(input: $input) {
            id
            match {
                id
            }
            fromUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
            toUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const accept = gql`
    mutation accept($input: MeetingAcceptInput!) {
        accept(input: $input) {
            id
            fromUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
            toUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
            acceptedAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cancel = gql`
    mutation cancel($input: MeetingCancelInput!) {
        cancel(input: $input) {
            id
            fromUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
            toUserAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
            acceptedAddress {
                id
                placeId
                placeLabel
                time
                lat
                lng
            }
        }
    }
`;
