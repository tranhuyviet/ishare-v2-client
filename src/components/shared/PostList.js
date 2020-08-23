import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PostCard from './PostCard';
import { useStyles } from './PostList.style';

const PostList = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(GET_POSTS_QUERY);

    console.log(data);
    return (
        <Paper elevation={0} square>
            <Grid container justify="space-between" className={classes.container}>
                {data &&
                    data.getPosts &&
                    data.getPosts.map((post) => (
                        <Grid
                            item
                            key={post.id}
                            xs={12}
                            sm={6}
                            md={4}
                            className={classes.postCardContainer}
                        >
                            <PostCard post={post} />
                        </Grid>
                    ))}
            </Grid>
        </Paper>
    );
};

const GET_POSTS_QUERY = gql`
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
                comment
                createdAt
                user {
                    id
                    name
                    avatarUrl
                }
            }
            commentCount
        }
    }
`;

export default PostList;
