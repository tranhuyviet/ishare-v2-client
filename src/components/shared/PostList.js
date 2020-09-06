import React, { useState, useContext, useEffect } from 'react';
import {
    Grid,
    Paper,
    Tooltip,
    Typography,
    CardActionArea,
    Card,
    IconButton,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PostCard from './PostCard';
import { useStyles } from './PostList.style';
import { GET_POSTS_QUERY } from '../../utils/sharedGql';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { UIContext } from '../../context/uiContext';
import { AuthContext } from '../../context/authContext';
import { postCount } from '../../utils/postCount';

const PostList = () => {
    const classes = useStyles();
    const { tabValue, setPostCount } = useContext(UIContext);
    const { user } = useContext(AuthContext);
    // const [page, setPage] = useState(1);
    // const [dataPosts, setDataPosts] = useState([]);

    let type = 'NEWEST';
    if (tabValue === 1) type = 'TOPCOMMENTS';
    else if (tabValue === 2) type = 'TOPLIKES';
    else type = 'NEWEST';

    const { data, loading } = useQuery(GET_POSTS_QUERY, {
        variables: { type },
        onError(err) {
            console.log(err);
        },
        onCompleted(res) {
            console.log('RES', res);
            if (user) setPostCount(postCount(res.getPosts, user.id));
        },
    });

    useEffect(() => {
        if (data) {
            if (user) setPostCount(postCount(data.getPosts, user.id));
        }
    }, [data]);

    // const { data, refetch, updateQuery, client, loading } = useQuery(GET_POSTS_QUERY, {
    //     variables: {
    //         page: page,
    //     },
    //     fetchPolicy: 'cache-and-network',
    //     onError(err) {
    //         console.log(err);
    //     },
    //     onCompleted(res) {
    //         const newData = [...dataPosts, ...res.getPosts];

    //         setDataPosts(newData);
    //         client.writeQuery({
    //             query: GET_POSTS_QUERY,
    //             variables: { page: page },
    //             data: { getPosts: newData },
    //         });
    //         return newData;
    //     },
    // });

    console.log('data', data);
    return (
        <Paper elevation={0} square style={{ paddingBottom: 16 }}>
            <Grid container justify="flex-start" className={classes.container}>
                {/* {dataPosts &&
                    dataPosts.map((post) => (
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
                    ))} */}
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
            {/* <Grid container justify="center">
                <Tooltip title="View more..." style={{ textAlign: 'center' }}>
                    <IconButton
                        onClick={() => {
                            setPage((page) => page + 1);
                            
                        }}
                    >
                        <ArrowDropDownCircleIcon style={{ fontSize: 40 }} />
                    </IconButton>
                </Tooltip>
            </Grid> */}
        </Paper>
    );
};

export default PostList;
