import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
    query getPosts($type: String!, $userId: ID) {
        getPosts(type: $type, userId: $userId) {
            id
            content
            images
            createdAt
            user {
                id
                name
                avatarUrl
            }
            comments {
                id
                createdAt
                comment
                user {
                    id
                    name
                    avatarUrl
                }
            }
            likes {
                id
                createdAt
                user {
                    id
                    name
                    avatarUrl
                }
            }
            commentCount
            likeCount
            isLiked
        }
    }
`;

export const GET_POSTS_BY_USER_QUERY = gql`
    query getPostsByUser($userId: ID!) {
        getPostsByUser(userId: $userId) {
            id
            content
            images
            user {
                name
                avatarUrl
            }
            createdAt
            comments {
                comment
                createdAt
                user {
                    name
                    avatarUrl
                }
            }
            likes {
                createdAt
                user {
                    name
                    avatarUrl
                }
            }
            likeCount
            commentCount
            isLiked
        }
    }
`;

export const GET_POSTS_QUERY_FROM_CATCH = gql`
    {
        getPosts {
            id
            content
            images
            createdAt
            user {
                id
                name
                avatarUrl
            }
            comments {
                id
                createdAt
                comment
                user {
                    id
                    name
                    avatarUrl
                }
            }
            likes {
                id
                createdAt
                user {
                    id
                    name
                    avatarUrl
                }
            }
            commentCount
            likeCount
            isLiked
        }
    }
`;
