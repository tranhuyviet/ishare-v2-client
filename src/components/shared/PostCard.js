import React, { useContext, useState } from 'react';
import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Grid,
} from '@material-ui/core';
import { StyledMenu, StyledMenuItem } from '../shared/StyledMenu';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';

import moment from 'moment';
import { useStyles } from './PostCard.style';
import { AuthContext } from '../../context/authContext';

const PostCard = ({ post }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const userId = user.id;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar src={post.user.avatarUrl} alt={post.user.name} />}
                action={
                    userId === post.user.id ? (
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
                title={post.user.name}
                subheader={moment(post.createdAt * 1).fromNow(true)}
                className={classes.cardHeader}
            />
            <CardMedia image={post.images[0]} title={post.content} className={classes.cardImage} />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="p" className={classes.contentText}>
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteBorderIcon />
                </IconButton>
                <Typography>12</Typography>
                <IconButton style={{ marginLeft: 16 }}>
                    <CommentIcon />
                </IconButton>
                <Typography>34</Typography>
            </CardActions>
        </Card>
    );
};

export default PostCard;
