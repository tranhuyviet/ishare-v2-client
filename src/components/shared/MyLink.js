import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'inherit',
        transition: 'all 0.6 ease!important',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
    },
}));

const MyLink = (props) => {
    const classes = useStyles();
    return (
        <Link onClick={props.onClick} className={classes.link}>
            {props.children}
        </Link>
    );
};

export default MyLink;
