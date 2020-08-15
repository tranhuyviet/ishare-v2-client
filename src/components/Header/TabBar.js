import React, { useState, useContext } from 'react';
import { useStyles } from './TabBar.style';
import { Paper, Tab, Tabs, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from '../../context/authContext';

const TabBar = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const { user } = useContext(AuthContext);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Paper elevation={0} square>
            <Grid className={classes.container} container alignItems="center" direction="column">
                <Tabs
                    indicatorColor="primary"
                    centered
                    textColor="primary"
                    value={tabValue}
                    onChange={handleChange}
                    classes={{ indicator: classes.indicator }}
                >
                    <Tab label="Newest" classes={{ selected: classes.tabSelected }} />
                    <Tab label="Top Comments" classes={{ selected: classes.tabSelected }} />
                    <Tab label="Top Likes" classes={{ selected: classes.tabSelected }} />
                </Tabs>
                {user && user.token && (
                    <Fab color="primary" size="medium" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                )}
            </Grid>
        </Paper>
    );
};

export default TabBar;
