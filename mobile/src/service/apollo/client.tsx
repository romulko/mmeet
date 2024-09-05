import React from 'react';
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    from,
    InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {FC} from 'react';
import {GET_TOKEN} from '../auth/Auth';
import {createUploadLink} from 'apollo-upload-client';
import {SERVER_URL} from '../consts/consts';

// links
const authLink = new ApolloLink((operation, forward) => {
    const token = GET_TOKEN();

    if (token) {
        operation.setContext((context: any) => ({
            headers: {
                authorization: `Bearer ${token}`,
                ...context.headers,
            },
        }));
    }

    return forward(operation);
});

const uploadLink = createUploadLink({uri: `${SERVER_URL}/graphql`});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

// client
export const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findPeople: {
                        merge: (_, incoming) => incoming,
                    },
                    matches: {
                        merge: (_, incoming) => incoming,
                    },
                },
            },
        },
    }),
    link: from([errorLink, authLink, uploadLink]),
});

export const Apollo: FC<any> = ({children}) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);
