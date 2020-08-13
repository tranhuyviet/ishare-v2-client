import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    banner: {
        height: '210px',
    },
    container: {
        ...theme.share.container,
    },
    avatar: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        fontSize: '70px',
    },
    name: {
        fontWeight: 'bold',
        letterSpacing: 2,
        marginRight: 20,
    },
    infoContainer: {
        marginRight: theme.spacing(6),
    },
    infoGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    icon: {
        // marginRight: theme.spacing(1),
        fontSize: '28px',
    },
}));
