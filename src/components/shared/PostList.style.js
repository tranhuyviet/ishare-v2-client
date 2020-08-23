import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        ...theme.share.container,
        padding: 0,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center!important',
        },
    },
    postCardContainer: {
        maxWidth: 350,
        padding: theme.spacing(2),
        // [theme.breakpoints.down('sm')]: {
        //     display: 'flex',
        //     justifyContent: 'space-around',
        // },
    },
}));
