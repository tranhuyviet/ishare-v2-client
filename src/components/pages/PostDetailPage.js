import React, { useEffect } from 'react';
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

import Spinner from '../shared/Spinner';

import moment from 'moment';

import { useStyles } from './PostDetailPage.style';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import { commentSchema } from '../../schemas/commentSchema';

import LikeButton from '../shared/LikeButton';

const PostDetailPage = ({ post, user, postDetailPageOpen, handlePostDetailPageClose }) => {
    const classes = useStyles();
    const initialValues = {
        comment: '',
        postId: post.id,
    };

    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        setErrors,
        isValid,
        setValues,
        // touched,
        // setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: commentSchema,
        isInitialValid: commentSchema.isValidSync(initialValues),
    });

    const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: values,
        onError(error) {
            console.log(error);
        },
        update(proxy, result) {
            console.log('RESULT', result);
            setValues(initialValues);
        },
    });

    function onSubmit(values) {
        console.log('submit', values);
        createComment();
    }

    console.log('POST DETAIL RENDER');
    return (
        <Dialog
            open={postDetailPageOpen}
            onClose={handlePostDetailPageClose}
            className={classes.container}
            fullWidth={true}
            maxWidth={'md'}
        >
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
                        {/* this path is content of post */}
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
                        {/* this path is comments */}
                        {post.comments &&
                            post.comments.map((comment) => (
                                <CardHeader
                                    key={comment.id}
                                    avatar={
                                        <Avatar
                                            src={comment.user.avatarUrl}
                                            alt={comment.user.name}
                                        />
                                    }
                                    title={
                                        <span className={classes.userName}>
                                            {comment.user.name}
                                            <span className={classes.contentText}>
                                                {' '}
                                                {comment.comment}
                                            </span>
                                        </span>
                                    }
                                    subheader={moment(comment.createdAt).fromNow(true)}
                                    className={classes.comment}
                                />
                            ))}
                    </div>
                    <Paper elevation={0} square className={classes.actionContainer}>
                        <LikeButton post={post} user={user} />
                        <Typography style={{ fontWeight: 'bold' }}>
                            {post.likeCount} likes
                        </Typography>

                        <ChatBubbleOutlineIcon style={{ margin: '0 12px 0 32px' }} />

                        <Typography style={{ fontWeight: 'bold' }}>
                            {post.commentCount} comments
                        </Typography>
                    </Paper>
                    <Paper elevation={0} square>
                        <form className={classes.inputContainer} noValidate onSubmit={handleSubmit}>
                            <textarea
                                name="comment"
                                placeholder="Add a comment"
                                className={classes.input}
                                autoComplete="off"
                                autoCorrect="off"
                                wrap="hard"
                                height="18"
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            <Button
                                type="submit"
                                className={classes.postButton}
                                color="primary"
                                disabled={!isValid}
                            >
                                Post
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Dialog>
    );
};

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $comment: String!) {
        createComment(postId: $postId, comment: $comment) {
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

export default React.memo(PostDetailPage);
