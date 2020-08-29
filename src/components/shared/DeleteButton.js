import React, { useState } from 'react';
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

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };
    const [deleteMutation] = useMutation(DELETE_COMMENT_MUTATION, {
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
        },
    });
    return (
        <>
            <Tooltip title="Delete">
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
