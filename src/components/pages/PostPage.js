import React from 'react';
import { useStyles } from './PostPage.style';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    // Typography,
    IconButton,
    // Grid,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import PostForm from '../forms/PostForm';

const PostPage = ({ postPageOpen, handlePostPageClose }) => {
    const classes = useStyles();
    return (
        <Dialog open={postPageOpen} onClose={handlePostPageClose}>
            <DialogTitle className={classes.dialogTitleContainer}>
                <div className={classes.dialogTitle}>
                    Create New Post
                    <IconButton onClick={handlePostPageClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <PostForm handlePostPageClose={handlePostPageClose} />
            </DialogContent>
        </Dialog>
    );
};

export default PostPage;
