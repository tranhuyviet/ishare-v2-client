import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    // uri: 'https://merng-server-graphql.herokuapp.com/',
});

// const authLink = setContext(() => {
//     const token = localStorage.getItem('ishare2Token');
//     return {
//         headers: {
//             Authorization: token ? `Bearer ${token}` : '',
//         },
//     };
// });

const client = new ApolloClient({
    link: httpLink, //authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);