import {gql} from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const matches = gql`
    query matches {
        matches {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            isFromUserHasVideo
            isToUserHasVideo
            fromUser {
                id
                name
                birthday
                gender
                contactInfo
            }
            toUser {
                id
                name
                birthday
                gender
                contactInfo
            }
            meeting {
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
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const match = gql`
    query match($input: MatchFindOneInput!) {
        match(input: $input) {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            isFromUserHasVideo
            isToUserHasVideo
            fromUser {
                id
                name
                birthday
                gender
                contactInfo
            }
            toUser {
                id
                name
                birthday
                gender
                contactInfo
            }
            meeting {
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
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interestingPhoto = gql`
    mutation interestingPhoto($input: MatchInterestingPhotoInput!) {
        interestingPhoto(input: $input) {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            fromUser {
                id
            }
            toUser {
                id
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const skipPhoto = gql`
    mutation skipPhoto($input: MatchSkipPhotoInput!) {
        skipPhoto(input: $input) {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            fromUser {
                id
            }
            toUser {
                id
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interestingVideo = gql`
    mutation interestingVideo($input: MatchInterestingVideoInput!) {
        interestingVideo(input: $input) {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            fromUser {
                id
            }
            toUser {
                id
            }
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const skipVideo = gql`
    mutation skipVideo($input: MatchSkipVideoInput!) {
        skipVideo(input: $input) {
            id
            fromUserInterestedPhoto
            toUserInterestedPhoto
            fromUserInterestedVideo
            toUserInterestedVideo
            fromUser {
                id
            }
            toUser {
                id
            }
        }
    }
`;
