import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        // borderTop: '1px solid',
        // borderTopColor: theme.palette.primary.main,
    },
    cardHeader: {
        padding: 8,
    },
    cardImage: {
        minHeight: 350,
        width: '100%',
    },
    cardContent: {
        paddingBottom: 0,
    },
    contentText: {
        height: '38px',
        //padding: ' 0 10px',
        //marginBottom: '10px',

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        color: theme.palette.common.colorGreyDark,
        cursor: 'pointer',
    },
}));
