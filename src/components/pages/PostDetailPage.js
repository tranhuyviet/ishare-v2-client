import React, { useState } from 'react';
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
    CircularProgress,
    Tooltip,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Spinner from '../shared/Spinner';

import moment from 'moment';

import { useStyles } from './PostDetailPage.style';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import { commentSchema } from '../../schemas/commentSchema';

import LikeButton from '../shared/LikeButton';
import CommentLikeList from '../shared/CommentLikeList';
import MyLink from '../shared/MyLink';
import DeleteButton from '../shared/DeleteButton';

import { Image } from 'cloudinary-react';

const PostDetailPage = ({ post, user, postDetailPageOpen, handlePostDetailPageClose }) => {
    const classes = useStyles();
    const [commentListOpen, setCommentListOpen] = useState(false);
    const [likeListOpen, setLikeListOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

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

    const handleCommentListClose = () => {
        setCommentListOpen(false);
    };

    const handleLikeListClose = () => {
        setLikeListOpen(false);
    };

    const forwardImage = () => {
        // console.log('forward', imageIndex);
        if (imageIndex >= post.images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex((imageIndex) => imageIndex + 1);
        }
    };

    const backImage = () => {
        // console.log('backimage', imageIndex);
        if (imageIndex === 0) {
            setImageIndex(post.images.length - 1);
        } else {
            setImageIndex((imageIndex) => imageIndex - 1);
        }
    };

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
                    {/* <img src={post.images[imageIndex]} alt="post img" className={classes.images} /> */}
                    <img
                        src={process.env.REACT_APP_CLOUDINARY_LINK + post.images[imageIndex]}
                        className={classes.images}
                        alt="post img"
                    />
                    {/* <Image
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                        publicId={post.images[imageIndex]}
                        //className={classes.cardImage}
                        height="600"
                    /> */}

                    {post.images && post.images.length > 1 ? (
                        <>
                            <ArrowBackIosIcon
                                className={classes.arrowBackButton}
                                onClick={() => backImage()}
                            />
                            <ArrowForwardIosIcon
                                className={classes.arrowForwardButton}
                                onClick={() => forwardImage()}
                            />
                        </>
                    ) : null}
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
                                    action={
                                        comment.user.id.toString() === user.id.toString() ? (
                                            <DeleteButton
                                                postId={post.id}
                                                commentId={comment.id}
                                                deleteType="comment"
                                            />
                                        ) : null
                                    }
                                />
                            ))}
                    </div>
                    <Paper elevation={0} square className={classes.actionContainer}>
                        <LikeButton post={post} user={user} />
                        <Typography style={{ fontWeight: 'bold', fontSize: '14px' }}>
                            <MyLink onClick={() => setLikeListOpen(true)}>
                                {post.likeCount} {post.likeCount > 1 ? 'likes' : 'like'}
                            </MyLink>
                        </Typography>

                        <ChatBubbleOutlineIcon style={{ margin: '0 12px 0 32px' }} />

                        <Typography style={{ fontWeight: 'bold', fontSize: '14px' }}>
                            <MyLink onClick={() => setCommentListOpen(true)}>
                                {post.commentCount} {post.commentCount > 1 ? 'comments' : 'comment'}
                            </MyLink>
                        </Typography>
                    </Paper>
                    <Paper elevation={0} square>
                        <form className={classes.inputContainer} noValidate onSubmit={handleSubmit}>
                            <textarea
                                name="comment"
                                placeholder={
                                    user
                                        ? 'Add a comment'
                                        : 'You must login to add comments and likes'
                                }
                                className={classes.input}
                                autoComplete="off"
                                autoCorrect="off"
                                wrap="hard"
                                height="18"
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={!user || loading}
                            ></textarea>
                            <Button
                                type="submit"
                                className={classes.postButton}
                                color="primary"
                                disabled={!isValid || !user || loading}
                            >
                                Post
                            </Button>
                            {loading && (
                                <CircularProgress style={{ position: 'absolute', left: '50%' }} />
                            )}
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            {commentListOpen ? (
                <CommentLikeList
                    open={commentListOpen}
                    close={handleCommentListClose}
                    data={post.comments}
                    title="Comments"
                />
            ) : null}
            {likeListOpen ? (
                <CommentLikeList
                    open={likeListOpen}
                    close={handleLikeListClose}
                    data={post.likes}
                    title="Likes"
                    isLike={true}
                />
            ) : null}
            <IconButton
                color="primary"
                className={classes.closeIcon}
                onClick={handlePostDetailPageClose}
            >
                <CloseIcon />
            </IconButton>
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
