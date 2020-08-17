import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    navbar: {
        height: '54px',
        borderBottom: `1px solid ${theme.palette.grey['400']}`,
        backgroundColor: theme.palette.common.colorWhite,
    },
    container: {
        ...theme.share.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    logo: {
        display: 'inline-block',
        height: '60%',
        marginRight: '5px',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 700,
        color: theme.palette.common.colorBlack,
        letterSpacing: '2px',
    },
    logoTextSpec: {
        fontWeight: '900',
        color: theme.palette.primary.main,
    },

    icon: {
        fontSize: '24px',
        marginRight: '32px',
        color: theme.palette.common.colorBlack,
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: '18px',
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
    },
    name: {
        fontWeight: 'bold!important',
        fontSize: '16px!important',
    },
    divider: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    iconButton: {
        textTransform: 'capitalize!important',
        fontSize: '16px!important',
    },
    actionContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    menuButton: {
        display: 'none!important',
        [theme.breakpoints.down('xs')]: {
            display: 'inline-block!important',
        },
    },
}));
