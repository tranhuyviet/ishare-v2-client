import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './MyButton.style';

const MyButton = ({ title }) => {
    const classes = useStyles();
    return <Button className={classes.button}>{title}</Button>;
};

export default MyButton;
