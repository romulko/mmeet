import {gql} from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findPeople = gql`
    query findPeople($input: UserFindPeopleInput!) {
        findPeople(input: $input) {
            id
            name
            birthday
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const me = gql`
    query me {
        me {
            id
            googleId
            appleUserId
            email
            name
            gender
            contactInfo
            lookingFor
            birthday
            cityId
            cityLabel
            isPhotoAvailable
            ageRange
            zodiacSign
            zodiacSigns
            language
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userDeleteAccount = gql`
    mutation userDeleteAccount {
        userDeleteAccount {
            id
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateName = gql`
    mutation userUpdateName($userNameInput: UserNameInput!) {
        userUpdateName(userNameInput: $userNameInput) {
            id
            name
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateBirthday = gql`
    mutation userUpdateBirthday($userBirthdayInput: UserBirthdayInput!) {
        userUpdateBirthday(userBirthdayInput: $userBirthdayInput) {
            id
            birthday
            zodiacSign
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateGender = gql`
    mutation userUpdateGender($userGenderInput: UserGenderInput!) {
        userUpdateGender(userGenderInput: $userGenderInput) {
            id
            gender
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateContactInfo = gql`
    mutation userUpdateContactInfo($input: UserContactInfoInput!) {
        userUpdateContactInfo(input: $input) {
            id
            contactInfo
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateLookingFor = gql`
    mutation userUpdateLookingFor($userLookingForInput: UserLookingForInput!) {
        userUpdateLookingFor(userLookingForInput: $userLookingForInput) {
            id
            lookingFor
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdatePhoto = gql`
    mutation userUpdatePhoto($photo: Upload!) {
        userUpdatePhoto(photo: $photo) {
            id
            isPhotoAvailable
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateAgeRange = gql`
    mutation userUpdateAgeRange($userAgeRangeInput: UserAgeRangeInput!) {
        userUpdateAgeRange(userAgeRangeInput: $userAgeRangeInput) {
            id
            ageRange
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateCity = gql`
    mutation userUpdateCity($input: UserCityInput!) {
        userUpdateCity(input: $input) {
            id
            cityId
            cityLabel
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateZodiacSigns = gql`
    mutation userUpdateZodiacSigns($input: UserZodiacSignsInput!) {
        userUpdateZodiacSigns(input: $input) {
            id
            zodiacSigns
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userInviteFriend = gql`
    mutation userInviteFriend($input: UserInviteFriendInput!) {
        userInviteFriend(input: $input) {
            id
            email
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userUpdateLanguage = gql`
    mutation userUpdateLanguage($input: UserLanguageInput!) {
        userUpdateLanguage(input: $input) {
            id
            language
        }
    }
`;
