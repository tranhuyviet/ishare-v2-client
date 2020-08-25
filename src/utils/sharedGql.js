import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
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
