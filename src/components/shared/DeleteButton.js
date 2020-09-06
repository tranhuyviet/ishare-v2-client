import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    Typography,
    Divider,
} from '@material-ui/core';
import MyButton from './MyButton';
import { GET_POSTS_QUERY } from '../../utils/sharedGql';
import { UIContext } from '../../context/uiContext';

const DeleteButton = ({ postId, commentId, callback, tooltipPlace, deleteType }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { tabValue } = useContext(UIContext);
    let type = 'NEWEST';
    if (tabValue === 1) type = 'TOPCOMMENTS';
    else if (tabValue === 2) type = 'TOPLIKES';
    else type = 'NEWEST';
    console.log(postId, deleteType);
    let mutation;
    switch (deleteType) {
        case 'comment':
            mutation = DELETE_COMMENT_MUTATION;
            break;
        case 'post':
            mutation = DELETE_POST_MUTATION;
            break;
        default:
            break;
    }

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };
    const [deleteMutation] = useMutation(mutation, {
        variables: {
            postId,
            commentId,
        },
        onError(error) {
            setConfirmOpen(false);
            console.log(error);
        },
        update(proxy) {
            setConfirmOpen(false);

            // delete post
            if (deleteType === 'post' && !commentId) {
                console.log('DELETE POST', postId);
                const data = proxy.readQuery({
                    query: GET_POSTS_QUERY,
                    variables: { type },
                });
                console.log('data', data);

                proxy.writeQuery({
                    query: GET_POSTS_QUERY,
                    variables: { type },
                    data: {
                        getPosts: data.getPosts.filter((post) => post.id !== postId),
                    },
                });
            }
        },
    });
    return (
        <>
            <Tooltip title="Delete" placement={tooltipPlace}>
                <IconButton onClick={() => setConfirmOpen(true)}>
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <Typography variant="subtitle1" style={{ padding: 16, fontWeight: 'bold' }}>
                    Are you sure you want to delete?
                </Typography>
                <Divider />
                <DialogActions style={{ padding: 16 }}>
                    <MyButton title="No" reverse onClick={handleConfirmClose} />
                    <MyButton
                        title="Yes"
                        redColor
                        style={{ marginLeft: 16 }}
                        onClick={deleteMutation}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
};
const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
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

export default DeleteButton;
