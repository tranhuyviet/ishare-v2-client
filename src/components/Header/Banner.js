import React from 'react';
import { useStyles, useTheme } from './Banner.style';
import { Grid, Avatar, Typography, Paper } from '@material-ui/core';
import MyButton from '../shared/MyButton';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const Banner = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.banner} elevation={0} square>
            <Grid container className={classes.container} spacing={4}>
                <Grid item xs={4} container justify="flex-end" alignItems="center">
                    <Avatar
                        src="https://res.cloudinary.com/dzaxf70c4/image/upload/v1592381151/jqoyecsjkjtxxshaxhqt.jpg"
                        alt="user avatar"
                        className={classes.avatar}
                    />
                </Grid>
                <Grid item xs={8} container direction="column" justify="center" spacing={4}>
                    <Grid item container alignItems="center">
                        <Typography variant="h5" className={classes.name}>
                            Viet Tran
                        </Typography>
                        <MyButton title="Profile" />
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item className={classes.infoContainer}>
                            <div className={classes.infoGroup}>
                                <AddAPhotoIcon className={classes.icon} />
                                <Typography variant="subtitle1">132 posts</Typography>
                            </div>
                        </Grid>
                        <Grid item className={classes.infoContainer}>
                            <div className={classes.infoGroup}>
                                <CommentIcon className={classes.icon} />
                                <Typography variant="subtitle1">145 comments</Typography>
                            </div>
                        </Grid>
                        <Grid item className={classes.infoContainer}>
                            <div className={classes.infoGroup}>
                                <FavoriteIcon className={classes.icon} />
                                <Typography variant="subtitle1">99 likes</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Banner;
