import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const LikeButton = ({ post: { id, isLiked }, user }) => {
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
        update(proxy, result) {
            console.log('RESULT', result);
        },
    });

    const likeBtn = isLiked ? (
        <FavoriteIcon style={{ color: '#ED4956' }} />
    ) : (
        <FavoriteBorderIcon />
    );

    return (
        <IconButton onClick={likePost} disabled={!user}>
            {likeBtn}
        </IconButton>
    );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                createdAt
                user {
                    id
                    name
                    avatarUrl
                }
            }
            likeCount
            isLiked
        }
    }
`;

export default LikeButton;
