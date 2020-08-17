import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    dropzoneContainer: {
        height: 120,
        border: '2px dotted grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontSize: '16px',
        background: '#f4f4f4',
        '&:hover': {
            cursor: 'pointer',
        },
        outline: 'none',
    },
}));

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%',
};

const UploadImage = ({ files, setFiles, multiple, text }) => {
    const classes = useStyles();
    const [rejectMessage, setRejectMessage] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
        multiple: multiple ? true : false,
        onDropRejected: (rejectedFiles) => {
            // console.log('REject', rejectedFiles);
            setRejectMessage('Only accepted image files. Please try again.');
        },
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section>
            <div {...getRootProps({ className: 'dropzone' })} className={classes.dropzoneContainer}>
                <input {...getInputProps()} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CloudUploadIcon style={{ fontSize: '40px', color: 'grey' }} />
                    <p>{text}</p>
                </div>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
            {rejectMessage && <p style={{ color: 'red' }}>** {rejectMessage}</p>}
        </section>
    );
};

export default UploadImage;
