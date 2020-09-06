import React, { useState, useContext } from 'react';
import { useStyles } from './TabBar.style';
import { Paper, Tab, Tabs, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from '../../context/authContext';
import { UIContext } from '../../context/uiContext';

import PostPage from '../pages/PostPage';

const TabBar = () => {
    const classes = useStyles();
    // const [tabValue, setTabValue] = useState(0);
    const [postPageOpen, setPostPageOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { tabValue, setTabValue } = useContext(UIContext);

    const handleTabValueChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handlePostPageClose = () => {
        setPostPageOpen(false);
    };

    return (
        <Paper elevation={0} square>
            <Grid className={classes.container} container alignItems="center" direction="column">
                <Tabs
                    indicatorColor="primary"
                    centered
                    textColor="primary"
                    value={tabValue}
                    onChange={handleTabValueChange}
                    classes={{ indicator: classes.indicator }}
                >
                    <Tab
                        label="Newest"
                        classes={{ selected: classes.tabSelected }}
                        className={classes.tab}
                    />
                    <Tab
                        label="Top Comments"
                        classes={{ selected: classes.tabSelected }}
                        className={classes.tab}
                    />
                    <Tab
                        label="Top Likes"
                        classes={{ selected: classes.tabSelected }}
                        className={classes.tab}
                    />
                </Tabs>
                {user && user.token && (
                    <Fab
                        color="primary"
                        size="medium"
                        className={classes.fab}
                        onClick={() => setPostPageOpen(true)}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Grid>
            <PostPage postPageOpen={postPageOpen} handlePostPageClose={handlePostPageClose} />
        </Paper>
    );
};

export default TabBar;
