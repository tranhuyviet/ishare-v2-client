import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        ...theme.share.container,
    },
    gridContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    },
    imagesContainer: {
        maxWidth: 600,
        maxHeight: 600,
        background: theme.palette.common.black,
        overflow: 'hidden',
    },
    images: {
        display: 'block',
        width: 'auto',
        height: 600,
    },
    infoContainer: {
        minWidth: 350,
        position: 'relative!important',
    },
    userName: {
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: 16,
    },
    contentText: {
        fontWeight: 'normal',
        cursor: 'default',
    },
    cardHeader: {
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey['200'],
        position: 'fixed',
        minWidth: 350,
        zIndex: 100,
        background: 'white',
        // padding: '10px 16px 10px 16px',
    },
    commentContainer: {
        position: 'absolute',
        top: 73,
        left: 0,
        overflowY: 'scroll',
        height: 'calc(100% - 73px - 60px - 60px)',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    comment: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    actionContainer: {
        height: 60,
        width: 350,
        borderTop: '1px solid',
        borderTopColor: theme.palette.grey['200'],
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey['200'],
        position: 'absolute',
        zIndex: 101,
        bottom: 60,
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        height: 60,
        width: 350,
        // borderTop: '1px solid',
        // borderTopColor: theme.palette.grey['200'],
        position: 'absolute',
        zIndex: 101,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
    },

    input: {
        maxHeight: 58,
        width: '100%',
        outline: 'none',
        border: 'none',
        fontFamily: 'inherit!important',
        fontSize: 14,
        paddingLeft: 16,
        paddingTop: 18,
        resize: 'none',
        '&:placeholder': {
            fontFamily: 'inherit!important',
        },
        display: 'flex',
        flexGrow: 1,
        overflowWrap: 'break-word',
    },
    postButton: {
        textTransform: 'capitalize',
    },
}));
