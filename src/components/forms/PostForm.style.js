import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(2),
            },
        },
        width: 303,
        padding: '16px 0 0 0',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '250px',
        },
    },
}));
