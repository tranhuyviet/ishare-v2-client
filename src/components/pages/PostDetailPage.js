import React from 'react';
import {
    Dialog,
    DialogTitle,
    IconButton,
    Grid,
    Backdrop,
    CardHeader,
    Avatar,
    Paper,
    Button,
    Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import moment from 'moment';

import { useStyles } from './PostDetailPage.style';

const PostDetailPage = ({ post, postDetailPageOpen, handlePostDetailPageClose }) => {
    const classes = useStyles();
    return (
        // <Backdrop
        //     open={postDetailPageOpen}
        //     onClick={handlePostDetailPageClose}
        //     className={classes.backdrop}
        // >
        <Dialog
            open={postDetailPageOpen}
            onClose={handlePostDetailPageClose}
            className={classes.container}
            fullWidth={true}
            maxWidth={'md'}
        >
            {/* <DialogTitle className={classes.dialogTitle}>
                <IconButton className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle> */}
            <Grid container className={classes.gridContainer}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    className={classes.imagesContainer}
                    container
                    justify="center"
                >
                    <img src={post.images[0]} alt="post img" className={classes.images} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    className={classes.infoContainer}
                    container
                    direction="column"
                >
                    <CardHeader
                        avatar={<Avatar src={post.user.avatarUrl} alt={post.user.name} />}
                        title={<span className={classes.userName}>{post.user.name}</span>}
                        subheader={moment(post.createdAt * 1).fromNow(true)}
                        className={classes.cardHeader}
                    />
                    <div className={classes.commentContainer}>
                        <CardHeader
                            avatar={<Avatar src={post.user.avatarUrl} alt={post.user.name} />}
                            title={
                                <span className={classes.userName}>
                                    {post.user.name}
                                    <span className={classes.contentText}> {post.content}</span>
                                </span>
                            }
                            subheader={moment(post.createdAt * 1).fromNow(true)}
                            className={classes.comment}
                        />
                        <CardHeader
                            avatar={<Avatar src={post.user.avatarUrl} alt={post.user.name} />}
                            title={
                                <span className={classes.userName}>
                                    {post.user.name}
                                    <span className={classes.contentText}>
                                        {' '}
                                        "Hello everyone 💋🥰. May this short vacation break allow us
                                        all to make the best decisions for the future and come back
                                        stronger and more committed than ever. . See you soon! 💪🏼👊🏼"
                                    </span>
                                </span>
                            }
                            subheader={moment(post.createdAt * 1).fromNow(true)}
                            className={classes.comment}
                        />
                    </div>
                    <Paper elevation={0} square className={classes.actionContainer}>
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <Typography style={{ fontWeight: 'bold' }}>12 likes</Typography>

                        <ChatBubbleOutlineIcon style={{ margin: '0 12px 0 32px' }} />

                        <Typography style={{ fontWeight: 'bold' }}>34 comments</Typography>
                    </Paper>
                    <Paper elevation={0} square className={classes.inputContainer}>
                        <textarea
                            name="comment"
                            placeholder="Add a comment"
                            className={classes.input}
                            autoComplete="off"
                            autoCorrect="off"
                            wrap="hard"
                            height="18"
                        ></textarea>
                        <Button type="submit" className={classes.postButton} color="primary">
                            Post
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Dialog>
        // <IconButton className={classes.closeButton}>
        //     <CloseIcon fontSize="large" />
        // </IconButton>
        // </Backdrop>
    );
};

export default PostDetailPage;
