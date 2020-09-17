import React, { useContext } from 'react';
import { useStyles } from './Banner.style';
import { Grid, Avatar, Typography, Paper, CardActionArea } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
// import MyButton from '../shared/MyButton';

// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentIcon from '@material-ui/icons/Comment';
import { AuthContext } from '../../context/authContext';
import { UIContext } from '../../context/uiContext';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
// import { GET_POSTS_BY_USER_QUERY } from '../../utils/sharedGql';

const Banner = () => {
    const classes = useStyles();
    // const theme = useTheme();
    // const isXS = useMediaQuery(theme.breakpoints.down('xs'));
    const { user } = useContext(AuthContext);
    const { postCount, setPostsOfUserId } = useContext(UIContext);

    // const { data } = useQuery(GET_POSTS_BY_USER_QUERY, {
    //     variables: { userId: user.id },
    //     onError(err) {
    //         console.log(err);
    //     },
    // });

    // console.log('DATA GET BY USER ID', data);

    return (
        <>
            {user && user.token && (
                <Paper className={classes.banner} elevation={0} square>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={5} className={classes.avatarContainer}>
                            <Avatar
                                src={user.avatarUrl}
                                alt="user avatar"
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={7}
                            container
                            spacing={2}
                            className={classes.rightContainer}
                            alignItems="flex-start"
                            justify="center"
                            direction="column"
                        >
                            <Grid item className={classes.nameContainer}>
                                <Typography variant="h5" className={classes.name}>
                                    {user.name}
                                </Typography>
                                {/* <MyButton
                                    title="Profile"
                                    style={{ display: isXS ? 'none' : 'inherit' }}
                                /> */}
                            </Grid>
                            <Grid
                                item
                                container
                                alignItems="center"
                                className={classes.infosContainer}
                            >
                                <Grid item className={classes.infoContainer}>
                                    <CardActionArea
                                        className={classes.infoGroup}
                                        onClick={() => {
                                            setPostsOfUserId(user.id);
                                            // console.log('posts click');
                                        }}
                                    >
                                        <CameraAltOutlinedIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>
                                                {postCount ? postCount : 0}
                                            </span>
                                            <span>{postCount > 1 ? ' posts' : ' post'} </span>
                                        </Typography>
                                    </CardActionArea>
                                </Grid>
                                {/* <Grid item className={classes.infoContainer}>
                                    <CardActionArea className={classes.infoGroup}>
                                        <CommentIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>145</span> comments
                                        </Typography>
                                    </CardActionArea>
                                </Grid>
                                <Grid item className={classes.infoContainer}>
                                    <CardActionArea className={classes.infoGroup}>
                                        <FavoriteIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>99</span> likes
                                        </Typography>
                                    </CardActionArea>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default Banner;
