import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  placeId: Scalars['String'];
  placeLabel: Scalars['String'];
  time: Scalars['DateTime'];
};

export type Answer = {
  __typename?: 'Answer';
  duration: Scalars['Float'];
  id: Scalars['Int'];
  questionId: Scalars['Float'];
  user: User;
};

export type AvailableMeetingsInThisWeek = {
  __typename?: 'AvailableMeetingsInThisWeek';
  count: Scalars['Float'];
};

export type AvailableMeetingsPerWeek = {
  __typename?: 'AvailableMeetingsPerWeek';
  count: Scalars['Float'];
};

export enum GenderType {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type InvitedUser = {
  __typename?: 'InvitedUser';
  id: Scalars['Int'];
  invitedCount: Scalars['Int'];
  meetingsCount: Scalars['Int'];
  name: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  fromUser?: Maybe<User>;
  fromUserInterestedPhoto?: Maybe<Scalars['Boolean']>;
  fromUserInterestedVideo?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  isFromUserHasVideo?: Maybe<Scalars['Boolean']>;
  isToUserHasVideo?: Maybe<Scalars['Boolean']>;
  meeting?: Maybe<Meeting>;
  toUser?: Maybe<User>;
  toUserInterestedPhoto?: Maybe<Scalars['Boolean']>;
  toUserInterestedVideo?: Maybe<Scalars['Boolean']>;
};

export type MatchFindOneInput = {
  matchId: Scalars['Float'];
};

export type MatchInterestingPhotoInput = {
  interestingUserId: Scalars['Float'];
};

export type MatchInterestingVideoInput = {
  matchId: Scalars['Float'];
};

export type MatchSkipPhotoInput = {
  skipUserId: Scalars['Float'];
};

export type MatchSkipVideoInput = {
  matchId: Scalars['Float'];
};

export type Meeting = {
  __typename?: 'Meeting';
  acceptedAddress?: Maybe<Address>;
  fromUserAddress?: Maybe<Address>;
  id: Scalars['Int'];
  match: Match;
  toUserAddress?: Maybe<Address>;
};

export type MeetingAcceptInput = {
  matchId: Scalars['Float'];
};

export type MeetingCancelInput = {
  matchId: Scalars['Float'];
};

export type MeetingProposeInput = {
  matchId: Scalars['Float'];
  placeId: Scalars['String'];
  placeLabel: Scalars['String'];
  time: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accept: Meeting;
  cancel: Meeting;
  interestingPhoto: Match;
  interestingVideo: Match;
  propose: Meeting;
  questionAnswer: Answer;
  questionDeleteAnswer: Answer;
  skipPhoto: Match;
  skipVideo: Match;
  userDeleteAccount: User;
  userInviteFriend: User;
  userUpdateAgeRange: User;
  userUpdateBirthday: User;
  userUpdateCity: User;
  userUpdateContactInfo: User;
  userUpdateGender: User;
  userUpdateLanguage: User;
  userUpdateLookingFor: User;
  userUpdateName: User;
  userUpdatePhoto: User;
  userUpdateZodiacSigns: User;
};


export type MutationAcceptArgs = {
  input: MeetingAcceptInput;
};


export type MutationCancelArgs = {
  input: MeetingCancelInput;
};


export type MutationInterestingPhotoArgs = {
  input: MatchInterestingPhotoInput;
};


export type MutationInterestingVideoArgs = {
  input: MatchInterestingVideoInput;
};


export type MutationProposeArgs = {
  input: MeetingProposeInput;
};


export type MutationQuestionAnswerArgs = {
  input: QuestionAnswerInput;
  video: Scalars['Upload'];
};


export type MutationQuestionDeleteAnswerArgs = {
  input: QuestionDeleteAnswerInput;
};


export type MutationSkipPhotoArgs = {
  input: MatchSkipPhotoInput;
};


export type MutationSkipVideoArgs = {
  input: MatchSkipVideoInput;
};


export type MutationUserInviteFriendArgs = {
  input: UserInviteFriendInput;
};


export type MutationUserUpdateAgeRangeArgs = {
  userAgeRangeInput: UserAgeRangeInput;
};


export type MutationUserUpdateBirthdayArgs = {
  userBirthdayInput: UserBirthdayInput;
};


export type MutationUserUpdateCityArgs = {
  input: UserCityInput;
};


export type MutationUserUpdateContactInfoArgs = {
  input: UserContactInfoInput;
};


export type MutationUserUpdateGenderArgs = {
  userGenderInput: UserGenderInput;
};


export type MutationUserUpdateLanguageArgs = {
  input: UserLanguageInput;
};


export type MutationUserUpdateLookingForArgs = {
  userLookingForInput: UserLookingForInput;
};


export type MutationUserUpdateNameArgs = {
  userNameInput: UserNameInput;
};


export type MutationUserUpdatePhotoArgs = {
  photo: Scalars['Upload'];
};


export type MutationUserUpdateZodiacSignsArgs = {
  input: UserZodiacSignsInput;
};

export type Query = {
  __typename?: 'Query';
  availableMeetingsInThisWeek: AvailableMeetingsInThisWeek;
  availableMeetingsPerWeek: AvailableMeetingsPerWeek;
  findPeople: Array<User>;
  inviteFriendStatistic: StatisticEntity;
  match?: Maybe<Match>;
  matches: Array<Match>;
  me?: Maybe<User>;
  questions: Array<Question>;
};


export type QueryFindPeopleArgs = {
  input: UserFindPeopleInput;
};


export type QueryMatchArgs = {
  input: MatchFindOneInput;
};


export type QueryQuestionsArgs = {
  input: QuestionsInput;
};

export type Question = {
  __typename?: 'Question';
  answer?: Maybe<Answer>;
  id: Scalars['Int'];
  questions: Array<QuestionItem>;
  text: Scalars['String'];
};

export type QuestionAnswerInput = {
  duration: Scalars['Float'];
  questionId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type QuestionDeleteAnswerInput = {
  questionId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type QuestionItem = {
  __typename?: 'QuestionItem';
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type QuestionsInput = {
  userId: Scalars['Float'];
};

export type StatisticEntity = {
  __typename?: 'StatisticEntity';
  invitedUsers: Array<InvitedUser>;
};

export type User = {
  __typename?: 'User';
  ageRange?: Maybe<Scalars['String']>;
  appleUserId?: Maybe<Scalars['String']>;
  availableMeetings?: Maybe<Scalars['Float']>;
  birthday?: Maybe<Scalars['DateTime']>;
  cityId?: Maybe<Scalars['String']>;
  cityLabel?: Maybe<Scalars['String']>;
  cityLat?: Maybe<Scalars['Float']>;
  cityLng?: Maybe<Scalars['Float']>;
  contactInfo?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fcmToken?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderType>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  invitedByUserId?: Maybe<Scalars['Float']>;
  isPhotoAvailable?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  lookingFor?: Maybe<GenderType>;
  name?: Maybe<Scalars['String']>;
  zodiacSign?: Maybe<ZodiacSign>;
  zodiacSigns?: Maybe<Array<ZodiacSign>>;
};

export type UserAgeRangeInput = {
  from: Scalars['Float'];
  to: Scalars['Float'];
};

export type UserBirthdayInput = {
  birthday: Scalars['DateTime'];
};

export type UserCityInput = {
  cityId: Scalars['String'];
  cityLabel: Scalars['String'];
};

export type UserContactInfoInput = {
  contactInfo: Scalars['String'];
};

export type UserFindPeopleInput = {
  cityId: Scalars['String'];
  fromAge: Scalars['DateTime'];
  lookingFor: GenderType;
  toAge: Scalars['DateTime'];
  userId: Scalars['Float'];
  zodiacSigns?: InputMaybe<Array<ZodiacSign>>;
};

export type UserGenderInput = {
  gender: GenderType;
};

export type UserInviteFriendInput = {
  email: Scalars['String'];
};

export type UserLanguageInput = {
  language: Scalars['String'];
};

export type UserLookingForInput = {
  lookingFor: GenderType;
};

export type UserNameInput = {
  name: Scalars['String'];
};

export type UserZodiacSignsInput = {
  zodiacSigns?: InputMaybe<Array<ZodiacSign>>;
};

export enum ZodiacSign {
  Aquarius = 'AQUARIUS',
  Aries = 'ARIES',
  Cancer = 'CANCER',
  Capricornus = 'CAPRICORNUS',
  Gemini = 'GEMINI',
  Leo = 'LEO',
  Libra = 'LIBRA',
  Pisces = 'PISCES',
  Sagittarius = 'SAGITTARIUS',
  Scorpius = 'SCORPIUS',
  Taurus = 'TAURUS',
  Virgo = 'VIRGO'
}

export type LanguageWatcherQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguageWatcherQuery = { __typename?: 'Query', me?: { __typename?: 'User', language?: string | null } | null };

export type UpdateQuestionFragment = { __typename?: 'Question', answer?: { __typename?: 'Answer', id: number, questionId: number, duration: number } | null };

export type ProposalWatcherQueryVariables = Exact<{ [key: string]: never; }>;


export type ProposalWatcherQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, zodiacSigns?: Array<ZodiacSign> | null, lookingFor?: GenderType | null, cityId?: string | null, ageRange?: string | null } | null };

export type MatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchesQuery = { __typename?: 'Query', matches: Array<{ __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, isFromUserHasVideo?: boolean | null, isToUserHasVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number, name?: string | null, birthday?: any | null, gender?: GenderType | null, contactInfo?: string | null } | null, toUser?: { __typename?: 'User', id: number, name?: string | null, birthday?: any | null, gender?: GenderType | null, contactInfo?: string | null } | null, meeting?: { __typename?: 'Meeting', id: number, fromUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, toUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, acceptedAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null } | null }> };

export type MatchQueryVariables = Exact<{
  input: MatchFindOneInput;
}>;


export type MatchQuery = { __typename?: 'Query', match?: { __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, isFromUserHasVideo?: boolean | null, isToUserHasVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number, name?: string | null, birthday?: any | null, gender?: GenderType | null, contactInfo?: string | null } | null, toUser?: { __typename?: 'User', id: number, name?: string | null, birthday?: any | null, gender?: GenderType | null, contactInfo?: string | null } | null, meeting?: { __typename?: 'Meeting', id: number, fromUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, toUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, acceptedAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null } | null } | null };

export type InterestingPhotoMutationVariables = Exact<{
  input: MatchInterestingPhotoInput;
}>;


export type InterestingPhotoMutation = { __typename?: 'Mutation', interestingPhoto: { __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number } | null, toUser?: { __typename?: 'User', id: number } | null } };

export type SkipPhotoMutationVariables = Exact<{
  input: MatchSkipPhotoInput;
}>;


export type SkipPhotoMutation = { __typename?: 'Mutation', skipPhoto: { __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number } | null, toUser?: { __typename?: 'User', id: number } | null } };

export type InterestingVideoMutationVariables = Exact<{
  input: MatchInterestingVideoInput;
}>;


export type InterestingVideoMutation = { __typename?: 'Mutation', interestingVideo: { __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number } | null, toUser?: { __typename?: 'User', id: number } | null } };

export type SkipVideoMutationVariables = Exact<{
  input: MatchSkipVideoInput;
}>;


export type SkipVideoMutation = { __typename?: 'Mutation', skipVideo: { __typename?: 'Match', id: number, fromUserInterestedPhoto?: boolean | null, toUserInterestedPhoto?: boolean | null, fromUserInterestedVideo?: boolean | null, toUserInterestedVideo?: boolean | null, fromUser?: { __typename?: 'User', id: number } | null, toUser?: { __typename?: 'User', id: number } | null } };

export type ProposeMutationVariables = Exact<{
  input: MeetingProposeInput;
}>;


export type ProposeMutation = { __typename?: 'Mutation', propose: { __typename?: 'Meeting', id: number, match: { __typename?: 'Match', id: number }, fromUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, toUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null } };

export type AcceptMutationVariables = Exact<{
  input: MeetingAcceptInput;
}>;


export type AcceptMutation = { __typename?: 'Mutation', accept: { __typename?: 'Meeting', id: number, fromUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, toUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, acceptedAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null } };

export type CancelMutationVariables = Exact<{
  input: MeetingCancelInput;
}>;


export type CancelMutation = { __typename?: 'Mutation', cancel: { __typename?: 'Meeting', id: number, fromUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, toUserAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null, acceptedAddress?: { __typename?: 'Address', id: number, placeId: string, placeLabel: string, time: any, lat: number, lng: number } | null } };

export type AvailableMeetingsPerWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableMeetingsPerWeekQuery = { __typename?: 'Query', availableMeetingsPerWeek: { __typename?: 'AvailableMeetingsPerWeek', count: number } };

export type AvailableMeetingsInThisWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableMeetingsInThisWeekQuery = { __typename?: 'Query', availableMeetingsInThisWeek: { __typename?: 'AvailableMeetingsInThisWeek', count: number } };

export type QuestionsQueryVariables = Exact<{
  input: QuestionsInput;
}>;


export type QuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: number, text: string, questions: Array<{ __typename?: 'QuestionItem', id: number, text: string }>, answer?: { __typename?: 'Answer', id: number, questionId: number, duration: number } | null }> };

export type QuestionAnswerMutationVariables = Exact<{
  input: QuestionAnswerInput;
  video: Scalars['Upload'];
}>;


export type QuestionAnswerMutation = { __typename?: 'Mutation', questionAnswer: { __typename?: 'Answer', id: number, questionId: number, duration: number } };

export type QuestionDeleteAnswerMutationVariables = Exact<{
  input: QuestionDeleteAnswerInput;
}>;


export type QuestionDeleteAnswerMutation = { __typename?: 'Mutation', questionDeleteAnswer: { __typename?: 'Answer', id: number, questionId: number } };

export type InviteFriendStatisticQueryVariables = Exact<{ [key: string]: never; }>;


export type InviteFriendStatisticQuery = { __typename?: 'Query', inviteFriendStatistic: { __typename?: 'StatisticEntity', invitedUsers: Array<{ __typename?: 'InvitedUser', id: number, name: string, invitedCount: number, meetingsCount: number }> } };

export type FindPeopleQueryVariables = Exact<{
  input: UserFindPeopleInput;
}>;


export type FindPeopleQuery = { __typename?: 'Query', findPeople: Array<{ __typename?: 'User', id: number, name?: string | null, birthday?: any | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, googleId?: string | null, appleUserId?: string | null, email?: string | null, name?: string | null, gender?: GenderType | null, contactInfo?: string | null, lookingFor?: GenderType | null, birthday?: any | null, cityId?: string | null, cityLabel?: string | null, isPhotoAvailable?: boolean | null, ageRange?: string | null, zodiacSign?: ZodiacSign | null, zodiacSigns?: Array<ZodiacSign> | null, language?: string | null } | null };

export type UserDeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type UserDeleteAccountMutation = { __typename?: 'Mutation', userDeleteAccount: { __typename?: 'User', id: number } };

export type UserUpdateNameMutationVariables = Exact<{
  userNameInput: UserNameInput;
}>;


export type UserUpdateNameMutation = { __typename?: 'Mutation', userUpdateName: { __typename?: 'User', id: number, name?: string | null } };

export type UserUpdateBirthdayMutationVariables = Exact<{
  userBirthdayInput: UserBirthdayInput;
}>;


export type UserUpdateBirthdayMutation = { __typename?: 'Mutation', userUpdateBirthday: { __typename?: 'User', id: number, birthday?: any | null, zodiacSign?: ZodiacSign | null } };

export type UserUpdateGenderMutationVariables = Exact<{
  userGenderInput: UserGenderInput;
}>;


export type UserUpdateGenderMutation = { __typename?: 'Mutation', userUpdateGender: { __typename?: 'User', id: number, gender?: GenderType | null } };

export type UserUpdateContactInfoMutationVariables = Exact<{
  input: UserContactInfoInput;
}>;


export type UserUpdateContactInfoMutation = { __typename?: 'Mutation', userUpdateContactInfo: { __typename?: 'User', id: number, contactInfo?: string | null } };

export type UserUpdateLookingForMutationVariables = Exact<{
  userLookingForInput: UserLookingForInput;
}>;


export type UserUpdateLookingForMutation = { __typename?: 'Mutation', userUpdateLookingFor: { __typename?: 'User', id: number, lookingFor?: GenderType | null } };

export type UserUpdatePhotoMutationVariables = Exact<{
  photo: Scalars['Upload'];
}>;


export type UserUpdatePhotoMutation = { __typename?: 'Mutation', userUpdatePhoto: { __typename?: 'User', id: number, isPhotoAvailable?: boolean | null } };

export type UserUpdateAgeRangeMutationVariables = Exact<{
  userAgeRangeInput: UserAgeRangeInput;
}>;


export type UserUpdateAgeRangeMutation = { __typename?: 'Mutation', userUpdateAgeRange: { __typename?: 'User', id: number, ageRange?: string | null } };

export type UserUpdateCityMutationVariables = Exact<{
  input: UserCityInput;
}>;


export type UserUpdateCityMutation = { __typename?: 'Mutation', userUpdateCity: { __typename?: 'User', id: number, cityId?: string | null, cityLabel?: string | null } };

export type UserUpdateZodiacSignsMutationVariables = Exact<{
  input: UserZodiacSignsInput;
}>;


export type UserUpdateZodiacSignsMutation = { __typename?: 'Mutation', userUpdateZodiacSigns: { __typename?: 'User', id: number, zodiacSigns?: Array<ZodiacSign> | null } };

export type UserInviteFriendMutationVariables = Exact<{
  input: UserInviteFriendInput;
}>;


export type UserInviteFriendMutation = { __typename?: 'Mutation', userInviteFriend: { __typename?: 'User', id: number, email?: string | null } };

export type UserUpdateLanguageMutationVariables = Exact<{
  input: UserLanguageInput;
}>;


export type UserUpdateLanguageMutation = { __typename?: 'Mutation', userUpdateLanguage: { __typename?: 'User', id: number, language?: string | null } };

export const UpdateQuestionFragmentDoc = gql`
    fragment updateQuestion on Question {
  answer {
    id
    questionId
    duration
  }
}
    `;
export const LanguageWatcherDocument = gql`
    query languageWatcher {
  me {
    language
  }
}
    `;

/**
 * __useLanguageWatcherQuery__
 *
 * To run a query within a React component, call `useLanguageWatcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageWatcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageWatcherQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguageWatcherQuery(baseOptions?: Apollo.QueryHookOptions<LanguageWatcherQuery, LanguageWatcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LanguageWatcherQuery, LanguageWatcherQueryVariables>(LanguageWatcherDocument, options);
      }
export function useLanguageWatcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LanguageWatcherQuery, LanguageWatcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LanguageWatcherQuery, LanguageWatcherQueryVariables>(LanguageWatcherDocument, options);
        }
export type LanguageWatcherQueryHookResult = ReturnType<typeof useLanguageWatcherQuery>;
export type LanguageWatcherLazyQueryHookResult = ReturnType<typeof useLanguageWatcherLazyQuery>;
export type LanguageWatcherQueryResult = Apollo.QueryResult<LanguageWatcherQuery, LanguageWatcherQueryVariables>;
export const ProposalWatcherDocument = gql`
    query proposalWatcher {
  me {
    id
    zodiacSigns
    lookingFor
    cityId
    ageRange
  }
}
    `;

/**
 * __useProposalWatcherQuery__
 *
 * To run a query within a React component, call `useProposalWatcherQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalWatcherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalWatcherQuery({
 *   variables: {
 *   },
 * });
 */
export function useProposalWatcherQuery(baseOptions?: Apollo.QueryHookOptions<ProposalWatcherQuery, ProposalWatcherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProposalWatcherQuery, ProposalWatcherQueryVariables>(ProposalWatcherDocument, options);
      }
export function useProposalWatcherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProposalWatcherQuery, ProposalWatcherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProposalWatcherQuery, ProposalWatcherQueryVariables>(ProposalWatcherDocument, options);
        }
export type ProposalWatcherQueryHookResult = ReturnType<typeof useProposalWatcherQuery>;
export type ProposalWatcherLazyQueryHookResult = ReturnType<typeof useProposalWatcherLazyQuery>;
export type ProposalWatcherQueryResult = Apollo.QueryResult<ProposalWatcherQuery, ProposalWatcherQueryVariables>;
export const MatchesDocument = gql`
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

/**
 * __useMatchesQuery__
 *
 * To run a query within a React component, call `useMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchesQuery(baseOptions?: Apollo.QueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, options);
      }
export function useMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, options);
        }
export type MatchesQueryHookResult = ReturnType<typeof useMatchesQuery>;
export type MatchesLazyQueryHookResult = ReturnType<typeof useMatchesLazyQuery>;
export type MatchesQueryResult = Apollo.QueryResult<MatchesQuery, MatchesQueryVariables>;
export const MatchDocument = gql`
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

/**
 * __useMatchQuery__
 *
 * To run a query within a React component, call `useMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMatchQuery(baseOptions: Apollo.QueryHookOptions<MatchQuery, MatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchQuery, MatchQueryVariables>(MatchDocument, options);
      }
export function useMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchQuery, MatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchQuery, MatchQueryVariables>(MatchDocument, options);
        }
export type MatchQueryHookResult = ReturnType<typeof useMatchQuery>;
export type MatchLazyQueryHookResult = ReturnType<typeof useMatchLazyQuery>;
export type MatchQueryResult = Apollo.QueryResult<MatchQuery, MatchQueryVariables>;
export const InterestingPhotoDocument = gql`
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
export type InterestingPhotoMutationFn = Apollo.MutationFunction<InterestingPhotoMutation, InterestingPhotoMutationVariables>;

/**
 * __useInterestingPhotoMutation__
 *
 * To run a mutation, you first call `useInterestingPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInterestingPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [interestingPhotoMutation, { data, loading, error }] = useInterestingPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInterestingPhotoMutation(baseOptions?: Apollo.MutationHookOptions<InterestingPhotoMutation, InterestingPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InterestingPhotoMutation, InterestingPhotoMutationVariables>(InterestingPhotoDocument, options);
      }
export type InterestingPhotoMutationHookResult = ReturnType<typeof useInterestingPhotoMutation>;
export type InterestingPhotoMutationResult = Apollo.MutationResult<InterestingPhotoMutation>;
export type InterestingPhotoMutationOptions = Apollo.BaseMutationOptions<InterestingPhotoMutation, InterestingPhotoMutationVariables>;
export const SkipPhotoDocument = gql`
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
export type SkipPhotoMutationFn = Apollo.MutationFunction<SkipPhotoMutation, SkipPhotoMutationVariables>;

/**
 * __useSkipPhotoMutation__
 *
 * To run a mutation, you first call `useSkipPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipPhotoMutation, { data, loading, error }] = useSkipPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSkipPhotoMutation(baseOptions?: Apollo.MutationHookOptions<SkipPhotoMutation, SkipPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipPhotoMutation, SkipPhotoMutationVariables>(SkipPhotoDocument, options);
      }
export type SkipPhotoMutationHookResult = ReturnType<typeof useSkipPhotoMutation>;
export type SkipPhotoMutationResult = Apollo.MutationResult<SkipPhotoMutation>;
export type SkipPhotoMutationOptions = Apollo.BaseMutationOptions<SkipPhotoMutation, SkipPhotoMutationVariables>;
export const InterestingVideoDocument = gql`
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
export type InterestingVideoMutationFn = Apollo.MutationFunction<InterestingVideoMutation, InterestingVideoMutationVariables>;

/**
 * __useInterestingVideoMutation__
 *
 * To run a mutation, you first call `useInterestingVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInterestingVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [interestingVideoMutation, { data, loading, error }] = useInterestingVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInterestingVideoMutation(baseOptions?: Apollo.MutationHookOptions<InterestingVideoMutation, InterestingVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InterestingVideoMutation, InterestingVideoMutationVariables>(InterestingVideoDocument, options);
      }
export type InterestingVideoMutationHookResult = ReturnType<typeof useInterestingVideoMutation>;
export type InterestingVideoMutationResult = Apollo.MutationResult<InterestingVideoMutation>;
export type InterestingVideoMutationOptions = Apollo.BaseMutationOptions<InterestingVideoMutation, InterestingVideoMutationVariables>;
export const SkipVideoDocument = gql`
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
export type SkipVideoMutationFn = Apollo.MutationFunction<SkipVideoMutation, SkipVideoMutationVariables>;

/**
 * __useSkipVideoMutation__
 *
 * To run a mutation, you first call `useSkipVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipVideoMutation, { data, loading, error }] = useSkipVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSkipVideoMutation(baseOptions?: Apollo.MutationHookOptions<SkipVideoMutation, SkipVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipVideoMutation, SkipVideoMutationVariables>(SkipVideoDocument, options);
      }
export type SkipVideoMutationHookResult = ReturnType<typeof useSkipVideoMutation>;
export type SkipVideoMutationResult = Apollo.MutationResult<SkipVideoMutation>;
export type SkipVideoMutationOptions = Apollo.BaseMutationOptions<SkipVideoMutation, SkipVideoMutationVariables>;
export const ProposeDocument = gql`
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
export type ProposeMutationFn = Apollo.MutationFunction<ProposeMutation, ProposeMutationVariables>;

/**
 * __useProposeMutation__
 *
 * To run a mutation, you first call `useProposeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProposeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proposeMutation, { data, loading, error }] = useProposeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProposeMutation(baseOptions?: Apollo.MutationHookOptions<ProposeMutation, ProposeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProposeMutation, ProposeMutationVariables>(ProposeDocument, options);
      }
export type ProposeMutationHookResult = ReturnType<typeof useProposeMutation>;
export type ProposeMutationResult = Apollo.MutationResult<ProposeMutation>;
export type ProposeMutationOptions = Apollo.BaseMutationOptions<ProposeMutation, ProposeMutationVariables>;
export const AcceptDocument = gql`
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
export type AcceptMutationFn = Apollo.MutationFunction<AcceptMutation, AcceptMutationVariables>;

/**
 * __useAcceptMutation__
 *
 * To run a mutation, you first call `useAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptMutation, { data, loading, error }] = useAcceptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptMutation(baseOptions?: Apollo.MutationHookOptions<AcceptMutation, AcceptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptMutation, AcceptMutationVariables>(AcceptDocument, options);
      }
export type AcceptMutationHookResult = ReturnType<typeof useAcceptMutation>;
export type AcceptMutationResult = Apollo.MutationResult<AcceptMutation>;
export type AcceptMutationOptions = Apollo.BaseMutationOptions<AcceptMutation, AcceptMutationVariables>;
export const CancelDocument = gql`
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
export type CancelMutationFn = Apollo.MutationFunction<CancelMutation, CancelMutationVariables>;

/**
 * __useCancelMutation__
 *
 * To run a mutation, you first call `useCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMutation, { data, loading, error }] = useCancelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelMutation(baseOptions?: Apollo.MutationHookOptions<CancelMutation, CancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelMutation, CancelMutationVariables>(CancelDocument, options);
      }
export type CancelMutationHookResult = ReturnType<typeof useCancelMutation>;
export type CancelMutationResult = Apollo.MutationResult<CancelMutation>;
export type CancelMutationOptions = Apollo.BaseMutationOptions<CancelMutation, CancelMutationVariables>;
export const AvailableMeetingsPerWeekDocument = gql`
    query availableMeetingsPerWeek {
  availableMeetingsPerWeek {
    count
  }
}
    `;

/**
 * __useAvailableMeetingsPerWeekQuery__
 *
 * To run a query within a React component, call `useAvailableMeetingsPerWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableMeetingsPerWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableMeetingsPerWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableMeetingsPerWeekQuery(baseOptions?: Apollo.QueryHookOptions<AvailableMeetingsPerWeekQuery, AvailableMeetingsPerWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableMeetingsPerWeekQuery, AvailableMeetingsPerWeekQueryVariables>(AvailableMeetingsPerWeekDocument, options);
      }
export function useAvailableMeetingsPerWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableMeetingsPerWeekQuery, AvailableMeetingsPerWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableMeetingsPerWeekQuery, AvailableMeetingsPerWeekQueryVariables>(AvailableMeetingsPerWeekDocument, options);
        }
export type AvailableMeetingsPerWeekQueryHookResult = ReturnType<typeof useAvailableMeetingsPerWeekQuery>;
export type AvailableMeetingsPerWeekLazyQueryHookResult = ReturnType<typeof useAvailableMeetingsPerWeekLazyQuery>;
export type AvailableMeetingsPerWeekQueryResult = Apollo.QueryResult<AvailableMeetingsPerWeekQuery, AvailableMeetingsPerWeekQueryVariables>;
export const AvailableMeetingsInThisWeekDocument = gql`
    query availableMeetingsInThisWeek {
  availableMeetingsInThisWeek {
    count
  }
}
    `;

/**
 * __useAvailableMeetingsInThisWeekQuery__
 *
 * To run a query within a React component, call `useAvailableMeetingsInThisWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableMeetingsInThisWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableMeetingsInThisWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableMeetingsInThisWeekQuery(baseOptions?: Apollo.QueryHookOptions<AvailableMeetingsInThisWeekQuery, AvailableMeetingsInThisWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableMeetingsInThisWeekQuery, AvailableMeetingsInThisWeekQueryVariables>(AvailableMeetingsInThisWeekDocument, options);
      }
export function useAvailableMeetingsInThisWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableMeetingsInThisWeekQuery, AvailableMeetingsInThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableMeetingsInThisWeekQuery, AvailableMeetingsInThisWeekQueryVariables>(AvailableMeetingsInThisWeekDocument, options);
        }
export type AvailableMeetingsInThisWeekQueryHookResult = ReturnType<typeof useAvailableMeetingsInThisWeekQuery>;
export type AvailableMeetingsInThisWeekLazyQueryHookResult = ReturnType<typeof useAvailableMeetingsInThisWeekLazyQuery>;
export type AvailableMeetingsInThisWeekQueryResult = Apollo.QueryResult<AvailableMeetingsInThisWeekQuery, AvailableMeetingsInThisWeekQueryVariables>;
export const QuestionsDocument = gql`
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

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const QuestionAnswerDocument = gql`
    mutation questionAnswer($input: QuestionAnswerInput!, $video: Upload!) {
  questionAnswer(input: $input, video: $video) {
    id
    questionId
    duration
  }
}
    `;
export type QuestionAnswerMutationFn = Apollo.MutationFunction<QuestionAnswerMutation, QuestionAnswerMutationVariables>;

/**
 * __useQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [questionAnswerMutation, { data, loading, error }] = useQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *      video: // value for 'video'
 *   },
 * });
 */
export function useQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<QuestionAnswerMutation, QuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QuestionAnswerMutation, QuestionAnswerMutationVariables>(QuestionAnswerDocument, options);
      }
export type QuestionAnswerMutationHookResult = ReturnType<typeof useQuestionAnswerMutation>;
export type QuestionAnswerMutationResult = Apollo.MutationResult<QuestionAnswerMutation>;
export type QuestionAnswerMutationOptions = Apollo.BaseMutationOptions<QuestionAnswerMutation, QuestionAnswerMutationVariables>;
export const QuestionDeleteAnswerDocument = gql`
    mutation questionDeleteAnswer($input: QuestionDeleteAnswerInput!) {
  questionDeleteAnswer(input: $input) {
    id
    questionId
  }
}
    `;
export type QuestionDeleteAnswerMutationFn = Apollo.MutationFunction<QuestionDeleteAnswerMutation, QuestionDeleteAnswerMutationVariables>;

/**
 * __useQuestionDeleteAnswerMutation__
 *
 * To run a mutation, you first call `useQuestionDeleteAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuestionDeleteAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [questionDeleteAnswerMutation, { data, loading, error }] = useQuestionDeleteAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQuestionDeleteAnswerMutation(baseOptions?: Apollo.MutationHookOptions<QuestionDeleteAnswerMutation, QuestionDeleteAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QuestionDeleteAnswerMutation, QuestionDeleteAnswerMutationVariables>(QuestionDeleteAnswerDocument, options);
      }
export type QuestionDeleteAnswerMutationHookResult = ReturnType<typeof useQuestionDeleteAnswerMutation>;
export type QuestionDeleteAnswerMutationResult = Apollo.MutationResult<QuestionDeleteAnswerMutation>;
export type QuestionDeleteAnswerMutationOptions = Apollo.BaseMutationOptions<QuestionDeleteAnswerMutation, QuestionDeleteAnswerMutationVariables>;
export const InviteFriendStatisticDocument = gql`
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

/**
 * __useInviteFriendStatisticQuery__
 *
 * To run a query within a React component, call `useInviteFriendStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useInviteFriendStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInviteFriendStatisticQuery({
 *   variables: {
 *   },
 * });
 */
export function useInviteFriendStatisticQuery(baseOptions?: Apollo.QueryHookOptions<InviteFriendStatisticQuery, InviteFriendStatisticQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InviteFriendStatisticQuery, InviteFriendStatisticQueryVariables>(InviteFriendStatisticDocument, options);
      }
export function useInviteFriendStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InviteFriendStatisticQuery, InviteFriendStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InviteFriendStatisticQuery, InviteFriendStatisticQueryVariables>(InviteFriendStatisticDocument, options);
        }
export type InviteFriendStatisticQueryHookResult = ReturnType<typeof useInviteFriendStatisticQuery>;
export type InviteFriendStatisticLazyQueryHookResult = ReturnType<typeof useInviteFriendStatisticLazyQuery>;
export type InviteFriendStatisticQueryResult = Apollo.QueryResult<InviteFriendStatisticQuery, InviteFriendStatisticQueryVariables>;
export const FindPeopleDocument = gql`
    query findPeople($input: UserFindPeopleInput!) {
  findPeople(input: $input) {
    id
    name
    birthday
  }
}
    `;

/**
 * __useFindPeopleQuery__
 *
 * To run a query within a React component, call `useFindPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPeopleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindPeopleQuery(baseOptions: Apollo.QueryHookOptions<FindPeopleQuery, FindPeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPeopleQuery, FindPeopleQueryVariables>(FindPeopleDocument, options);
      }
export function useFindPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPeopleQuery, FindPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPeopleQuery, FindPeopleQueryVariables>(FindPeopleDocument, options);
        }
export type FindPeopleQueryHookResult = ReturnType<typeof useFindPeopleQuery>;
export type FindPeopleLazyQueryHookResult = ReturnType<typeof useFindPeopleLazyQuery>;
export type FindPeopleQueryResult = Apollo.QueryResult<FindPeopleQuery, FindPeopleQueryVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDeleteAccountDocument = gql`
    mutation userDeleteAccount {
  userDeleteAccount {
    id
  }
}
    `;
export type UserDeleteAccountMutationFn = Apollo.MutationFunction<UserDeleteAccountMutation, UserDeleteAccountMutationVariables>;

/**
 * __useUserDeleteAccountMutation__
 *
 * To run a mutation, you first call `useUserDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userDeleteAccountMutation, { data, loading, error }] = useUserDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<UserDeleteAccountMutation, UserDeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserDeleteAccountMutation, UserDeleteAccountMutationVariables>(UserDeleteAccountDocument, options);
      }
export type UserDeleteAccountMutationHookResult = ReturnType<typeof useUserDeleteAccountMutation>;
export type UserDeleteAccountMutationResult = Apollo.MutationResult<UserDeleteAccountMutation>;
export type UserDeleteAccountMutationOptions = Apollo.BaseMutationOptions<UserDeleteAccountMutation, UserDeleteAccountMutationVariables>;
export const UserUpdateNameDocument = gql`
    mutation userUpdateName($userNameInput: UserNameInput!) {
  userUpdateName(userNameInput: $userNameInput) {
    id
    name
  }
}
    `;
export type UserUpdateNameMutationFn = Apollo.MutationFunction<UserUpdateNameMutation, UserUpdateNameMutationVariables>;

/**
 * __useUserUpdateNameMutation__
 *
 * To run a mutation, you first call `useUserUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateNameMutation, { data, loading, error }] = useUserUpdateNameMutation({
 *   variables: {
 *      userNameInput: // value for 'userNameInput'
 *   },
 * });
 */
export function useUserUpdateNameMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateNameMutation, UserUpdateNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateNameMutation, UserUpdateNameMutationVariables>(UserUpdateNameDocument, options);
      }
export type UserUpdateNameMutationHookResult = ReturnType<typeof useUserUpdateNameMutation>;
export type UserUpdateNameMutationResult = Apollo.MutationResult<UserUpdateNameMutation>;
export type UserUpdateNameMutationOptions = Apollo.BaseMutationOptions<UserUpdateNameMutation, UserUpdateNameMutationVariables>;
export const UserUpdateBirthdayDocument = gql`
    mutation userUpdateBirthday($userBirthdayInput: UserBirthdayInput!) {
  userUpdateBirthday(userBirthdayInput: $userBirthdayInput) {
    id
    birthday
    zodiacSign
  }
}
    `;
export type UserUpdateBirthdayMutationFn = Apollo.MutationFunction<UserUpdateBirthdayMutation, UserUpdateBirthdayMutationVariables>;

/**
 * __useUserUpdateBirthdayMutation__
 *
 * To run a mutation, you first call `useUserUpdateBirthdayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateBirthdayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateBirthdayMutation, { data, loading, error }] = useUserUpdateBirthdayMutation({
 *   variables: {
 *      userBirthdayInput: // value for 'userBirthdayInput'
 *   },
 * });
 */
export function useUserUpdateBirthdayMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateBirthdayMutation, UserUpdateBirthdayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateBirthdayMutation, UserUpdateBirthdayMutationVariables>(UserUpdateBirthdayDocument, options);
      }
export type UserUpdateBirthdayMutationHookResult = ReturnType<typeof useUserUpdateBirthdayMutation>;
export type UserUpdateBirthdayMutationResult = Apollo.MutationResult<UserUpdateBirthdayMutation>;
export type UserUpdateBirthdayMutationOptions = Apollo.BaseMutationOptions<UserUpdateBirthdayMutation, UserUpdateBirthdayMutationVariables>;
export const UserUpdateGenderDocument = gql`
    mutation userUpdateGender($userGenderInput: UserGenderInput!) {
  userUpdateGender(userGenderInput: $userGenderInput) {
    id
    gender
  }
}
    `;
export type UserUpdateGenderMutationFn = Apollo.MutationFunction<UserUpdateGenderMutation, UserUpdateGenderMutationVariables>;

/**
 * __useUserUpdateGenderMutation__
 *
 * To run a mutation, you first call `useUserUpdateGenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateGenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateGenderMutation, { data, loading, error }] = useUserUpdateGenderMutation({
 *   variables: {
 *      userGenderInput: // value for 'userGenderInput'
 *   },
 * });
 */
export function useUserUpdateGenderMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateGenderMutation, UserUpdateGenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateGenderMutation, UserUpdateGenderMutationVariables>(UserUpdateGenderDocument, options);
      }
export type UserUpdateGenderMutationHookResult = ReturnType<typeof useUserUpdateGenderMutation>;
export type UserUpdateGenderMutationResult = Apollo.MutationResult<UserUpdateGenderMutation>;
export type UserUpdateGenderMutationOptions = Apollo.BaseMutationOptions<UserUpdateGenderMutation, UserUpdateGenderMutationVariables>;
export const UserUpdateContactInfoDocument = gql`
    mutation userUpdateContactInfo($input: UserContactInfoInput!) {
  userUpdateContactInfo(input: $input) {
    id
    contactInfo
  }
}
    `;
export type UserUpdateContactInfoMutationFn = Apollo.MutationFunction<UserUpdateContactInfoMutation, UserUpdateContactInfoMutationVariables>;

/**
 * __useUserUpdateContactInfoMutation__
 *
 * To run a mutation, you first call `useUserUpdateContactInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateContactInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateContactInfoMutation, { data, loading, error }] = useUserUpdateContactInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateContactInfoMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateContactInfoMutation, UserUpdateContactInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateContactInfoMutation, UserUpdateContactInfoMutationVariables>(UserUpdateContactInfoDocument, options);
      }
export type UserUpdateContactInfoMutationHookResult = ReturnType<typeof useUserUpdateContactInfoMutation>;
export type UserUpdateContactInfoMutationResult = Apollo.MutationResult<UserUpdateContactInfoMutation>;
export type UserUpdateContactInfoMutationOptions = Apollo.BaseMutationOptions<UserUpdateContactInfoMutation, UserUpdateContactInfoMutationVariables>;
export const UserUpdateLookingForDocument = gql`
    mutation userUpdateLookingFor($userLookingForInput: UserLookingForInput!) {
  userUpdateLookingFor(userLookingForInput: $userLookingForInput) {
    id
    lookingFor
  }
}
    `;
export type UserUpdateLookingForMutationFn = Apollo.MutationFunction<UserUpdateLookingForMutation, UserUpdateLookingForMutationVariables>;

/**
 * __useUserUpdateLookingForMutation__
 *
 * To run a mutation, you first call `useUserUpdateLookingForMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateLookingForMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateLookingForMutation, { data, loading, error }] = useUserUpdateLookingForMutation({
 *   variables: {
 *      userLookingForInput: // value for 'userLookingForInput'
 *   },
 * });
 */
export function useUserUpdateLookingForMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateLookingForMutation, UserUpdateLookingForMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateLookingForMutation, UserUpdateLookingForMutationVariables>(UserUpdateLookingForDocument, options);
      }
export type UserUpdateLookingForMutationHookResult = ReturnType<typeof useUserUpdateLookingForMutation>;
export type UserUpdateLookingForMutationResult = Apollo.MutationResult<UserUpdateLookingForMutation>;
export type UserUpdateLookingForMutationOptions = Apollo.BaseMutationOptions<UserUpdateLookingForMutation, UserUpdateLookingForMutationVariables>;
export const UserUpdatePhotoDocument = gql`
    mutation userUpdatePhoto($photo: Upload!) {
  userUpdatePhoto(photo: $photo) {
    id
    isPhotoAvailable
  }
}
    `;
export type UserUpdatePhotoMutationFn = Apollo.MutationFunction<UserUpdatePhotoMutation, UserUpdatePhotoMutationVariables>;

/**
 * __useUserUpdatePhotoMutation__
 *
 * To run a mutation, you first call `useUserUpdatePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdatePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdatePhotoMutation, { data, loading, error }] = useUserUpdatePhotoMutation({
 *   variables: {
 *      photo: // value for 'photo'
 *   },
 * });
 */
export function useUserUpdatePhotoMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdatePhotoMutation, UserUpdatePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdatePhotoMutation, UserUpdatePhotoMutationVariables>(UserUpdatePhotoDocument, options);
      }
export type UserUpdatePhotoMutationHookResult = ReturnType<typeof useUserUpdatePhotoMutation>;
export type UserUpdatePhotoMutationResult = Apollo.MutationResult<UserUpdatePhotoMutation>;
export type UserUpdatePhotoMutationOptions = Apollo.BaseMutationOptions<UserUpdatePhotoMutation, UserUpdatePhotoMutationVariables>;
export const UserUpdateAgeRangeDocument = gql`
    mutation userUpdateAgeRange($userAgeRangeInput: UserAgeRangeInput!) {
  userUpdateAgeRange(userAgeRangeInput: $userAgeRangeInput) {
    id
    ageRange
  }
}
    `;
export type UserUpdateAgeRangeMutationFn = Apollo.MutationFunction<UserUpdateAgeRangeMutation, UserUpdateAgeRangeMutationVariables>;

/**
 * __useUserUpdateAgeRangeMutation__
 *
 * To run a mutation, you first call `useUserUpdateAgeRangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateAgeRangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateAgeRangeMutation, { data, loading, error }] = useUserUpdateAgeRangeMutation({
 *   variables: {
 *      userAgeRangeInput: // value for 'userAgeRangeInput'
 *   },
 * });
 */
export function useUserUpdateAgeRangeMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateAgeRangeMutation, UserUpdateAgeRangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateAgeRangeMutation, UserUpdateAgeRangeMutationVariables>(UserUpdateAgeRangeDocument, options);
      }
export type UserUpdateAgeRangeMutationHookResult = ReturnType<typeof useUserUpdateAgeRangeMutation>;
export type UserUpdateAgeRangeMutationResult = Apollo.MutationResult<UserUpdateAgeRangeMutation>;
export type UserUpdateAgeRangeMutationOptions = Apollo.BaseMutationOptions<UserUpdateAgeRangeMutation, UserUpdateAgeRangeMutationVariables>;
export const UserUpdateCityDocument = gql`
    mutation userUpdateCity($input: UserCityInput!) {
  userUpdateCity(input: $input) {
    id
    cityId
    cityLabel
  }
}
    `;
export type UserUpdateCityMutationFn = Apollo.MutationFunction<UserUpdateCityMutation, UserUpdateCityMutationVariables>;

/**
 * __useUserUpdateCityMutation__
 *
 * To run a mutation, you first call `useUserUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateCityMutation, { data, loading, error }] = useUserUpdateCityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateCityMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateCityMutation, UserUpdateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateCityMutation, UserUpdateCityMutationVariables>(UserUpdateCityDocument, options);
      }
export type UserUpdateCityMutationHookResult = ReturnType<typeof useUserUpdateCityMutation>;
export type UserUpdateCityMutationResult = Apollo.MutationResult<UserUpdateCityMutation>;
export type UserUpdateCityMutationOptions = Apollo.BaseMutationOptions<UserUpdateCityMutation, UserUpdateCityMutationVariables>;
export const UserUpdateZodiacSignsDocument = gql`
    mutation userUpdateZodiacSigns($input: UserZodiacSignsInput!) {
  userUpdateZodiacSigns(input: $input) {
    id
    zodiacSigns
  }
}
    `;
export type UserUpdateZodiacSignsMutationFn = Apollo.MutationFunction<UserUpdateZodiacSignsMutation, UserUpdateZodiacSignsMutationVariables>;

/**
 * __useUserUpdateZodiacSignsMutation__
 *
 * To run a mutation, you first call `useUserUpdateZodiacSignsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateZodiacSignsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateZodiacSignsMutation, { data, loading, error }] = useUserUpdateZodiacSignsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateZodiacSignsMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateZodiacSignsMutation, UserUpdateZodiacSignsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateZodiacSignsMutation, UserUpdateZodiacSignsMutationVariables>(UserUpdateZodiacSignsDocument, options);
      }
export type UserUpdateZodiacSignsMutationHookResult = ReturnType<typeof useUserUpdateZodiacSignsMutation>;
export type UserUpdateZodiacSignsMutationResult = Apollo.MutationResult<UserUpdateZodiacSignsMutation>;
export type UserUpdateZodiacSignsMutationOptions = Apollo.BaseMutationOptions<UserUpdateZodiacSignsMutation, UserUpdateZodiacSignsMutationVariables>;
export const UserInviteFriendDocument = gql`
    mutation userInviteFriend($input: UserInviteFriendInput!) {
  userInviteFriend(input: $input) {
    id
    email
  }
}
    `;
export type UserInviteFriendMutationFn = Apollo.MutationFunction<UserInviteFriendMutation, UserInviteFriendMutationVariables>;

/**
 * __useUserInviteFriendMutation__
 *
 * To run a mutation, you first call `useUserInviteFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserInviteFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userInviteFriendMutation, { data, loading, error }] = useUserInviteFriendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserInviteFriendMutation(baseOptions?: Apollo.MutationHookOptions<UserInviteFriendMutation, UserInviteFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserInviteFriendMutation, UserInviteFriendMutationVariables>(UserInviteFriendDocument, options);
      }
export type UserInviteFriendMutationHookResult = ReturnType<typeof useUserInviteFriendMutation>;
export type UserInviteFriendMutationResult = Apollo.MutationResult<UserInviteFriendMutation>;
export type UserInviteFriendMutationOptions = Apollo.BaseMutationOptions<UserInviteFriendMutation, UserInviteFriendMutationVariables>;
export const UserUpdateLanguageDocument = gql`
    mutation userUpdateLanguage($input: UserLanguageInput!) {
  userUpdateLanguage(input: $input) {
    id
    language
  }
}
    `;
export type UserUpdateLanguageMutationFn = Apollo.MutationFunction<UserUpdateLanguageMutation, UserUpdateLanguageMutationVariables>;

/**
 * __useUserUpdateLanguageMutation__
 *
 * To run a mutation, you first call `useUserUpdateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateLanguageMutation, { data, loading, error }] = useUserUpdateLanguageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateLanguageMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateLanguageMutation, UserUpdateLanguageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateLanguageMutation, UserUpdateLanguageMutationVariables>(UserUpdateLanguageDocument, options);
      }
export type UserUpdateLanguageMutationHookResult = ReturnType<typeof useUserUpdateLanguageMutation>;
export type UserUpdateLanguageMutationResult = Apollo.MutationResult<UserUpdateLanguageMutation>;
export type UserUpdateLanguageMutationOptions = Apollo.BaseMutationOptions<UserUpdateLanguageMutation, UserUpdateLanguageMutationVariables>;