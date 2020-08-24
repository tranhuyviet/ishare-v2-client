import React, { useContext, useState } from 'react';
import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Grid,
    Link,
} from '@material-ui/core';
import { StyledMenu, StyledMenuItem } from '../shared/StyledMenu';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CollectionsOutlinedIcon from '@material-ui/icons/CollectionsOutlined';
import CollectionsIcon from '@material-ui/icons/Collections';

import moment from 'moment';
import { useStyles } from './PostCard.style';
import { AuthContext } from '../../context/authContext';

import PostDetailPage from '../pages/PostDetailPage';
import LikeButton from '../shared/LikeButton';
import CommentList from '../shared/CommentLikeList';
import MyLink from '../shared/MyLink';

const PostCard = ({ post }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [postDetailPageOpen, setPostDetailPageOpen] = useState(false);
    const [commentListOpen, setCommentListOpen] = useState(false);
    const [likeListOpen, setLikeListOpen] = useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePostDetailPageClose = () => {
        setPostDetailPageOpen(false);
    };

    const handleCommentListClose = () => {
        setCommentListOpen(false);
    };

    const handleLikeListClose = () => {
        setLikeListOpen(false);
    };

    console.log('POST CARD RENDER');
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar src={post.user.avatarUrl} alt={post.user.name} />}
                action={
                    user && user.userId === post.user.id ? (
                        <>
                            <IconButton onClick={handleMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <StyledMenu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <StyledMenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                </StyledMenuItem>
                                <Divider />
                                <StyledMenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </>
                    ) : null
                }
                title={<span style={{ fontWeight: 'bold' }}>{post.user.name}</span>}
                subheader={moment(post.createdAt * 1).fromNow(true)}
                className={classes.cardHeader}
            />
            <CardActionArea
                className={classes.cardActionArea}
                onClick={() => setPostDetailPageOpen(true)}
            >
                <CardMedia
                    image={post.images[0]}
                    title={post.content}
                    className={classes.cardImage}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" component="p" className={classes.contentText}>
                        {post.content}
                    </Typography>
                </CardContent>
                {post.images.length > 1 ? (
                    <CollectionsIcon className={classes.multiImagesIcon} />
                ) : null}
            </CardActionArea>
            <CardActions disableSpacing>
                <LikeButton post={post} user={user} />
                <Typography style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    <MyLink onClick={() => setLikeListOpen(true)}>
                        {post.likeCount} {post.likeCount > 1 ? 'likes' : 'like'}
                    </MyLink>
                </Typography>
                <IconButton style={{ marginLeft: 16 }} onClick={() => setPostDetailPageOpen(true)}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <Typography style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    <MyLink onClick={() => setCommentListOpen(true)}>
                        {post.commentCount} {post.commentCount > 1 ? 'comments' : 'comment'}
                    </MyLink>
                </Typography>
            </CardActions>
            {postDetailPageOpen ? (
                <PostDetailPage
                    postDetailPageOpen={postDetailPageOpen}
                    handlePostDetailPageClose={handlePostDetailPageClose}
                    post={post}
                    user={user}
                />
            ) : null}
            {commentListOpen ? (
                <CommentList
                    open={commentListOpen}
                    close={handleCommentListClose}
                    data={post.comments}
                    title="Comments"
                />
            ) : null}
            {likeListOpen ? (
                <CommentList
                    open={likeListOpen}
                    close={handleLikeListClose}
                    data={post.likes}
                    title="Likes"
                    isLike={true}
                />
            ) : null}
        </Card>
    );
};

export default React.memo(PostCard);
