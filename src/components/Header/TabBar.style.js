import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        ...theme.share.container,
    },
    fab: {
        marginTop: theme.spacing(3),
    },
    // indicator: {
    //     height: 0,
    // },
    // tabSelected: {
    //     color: theme.palette.primary.main,
    //     fontWeight: 'bold',
    //     '&:before': {
    //         content: '""',
    //         position: 'absolute',
    //         backgroundColor: theme.palette.primary.main,
    //         // backgroundColor: theme.palette.common.black,
    //         left: '0%',
    //         right: '0%',
    //         height: '2px',
    //         top: 0,
    //         borderRadius: 4,
    //     },
    // },
}));
