import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
    query getPosts($type: String!) {
        getPosts(type: $type) {
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
