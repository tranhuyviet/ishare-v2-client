import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    banner: {
        minHeight: '210px',
    },
    container: {
        ...theme.share.container,
        borderBottom: `1px solid ${theme.palette.grey['400']}`,
        padding: '32px 0',
        [theme.breakpoints.down('xs')]: {
            padding: '16px 0',
        },
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    avatar: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        // fontSize: '70px',
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
    },
    rightContainer: {
        paddingLeft: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 16,
        },
    },
    nameContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            marginTop: 16,
            justifyContent: 'center',
        },
    },
    name: {
        fontWeight: 'bold',
        letterSpacing: 2,
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
            marginRight: 0,
            color: theme.palette.primary.main,
        },
    },
    profileButton: {
        [theme.breakpoints.down('xs')]: {
            display: 'none!important',
        },
    },
    infosContainer: {
        width: '100%',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-around',
        },
    },
    infoContainer: {
        marginRight: theme.spacing(6),
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
        },
    },
    infoGroup: {
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    icon: {
        fontSize: '28px',
        // marginBottom: 5,
        marginRight: 8,

        [theme.breakpoints.down('xs')]: {
            fontSize: '24px',
        },
    },
    number: {
        fontWeight: 'bold',
    },
}));
