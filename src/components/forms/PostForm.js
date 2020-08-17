import React, { useState } from 'react';
import { useStyles } from './PostForm.style';
import { TextField, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';

import { useFormik } from 'formik';
import MyButton from '../shared/MyButton';
import UploadImage from '../shared/UploadImage';

const PostForm = ({ handlePostPageClose }) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);

    const initialValues = {
        content: '',
        images: [],
    };

    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        setErrors,
        // isValid,
        // setValues,
        // touched,
        setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit,
        // validationSchema: signupSchema,
    });

    async function onSubmit(values) {
        console.log('submit post', values);
        try {
            await files.forEach(async (file) => {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_POSTS);
                const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
                console.log('RES', res);
            });
        } catch (error) {
            console.error(error);
        }
        handlePostPageClose();
    }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
                <TextField
                    name="content"
                    error={errors.content ? true : false}
                    label="Content"
                    placeholder="This is the content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.content}
                />
                <UploadImage files={files} setFiles={setFiles} multiple text="Upload your images" />
                <Grid container justify="flex-end" style={{ paddingTop: 16, paddingBottom: 16 }}>
                    <MyButton title="Cancel" onClick={() => handlePostPageClose()} />
                    <MyButton title="Post" type="submit" style={{ marginLeft: 16 }} />
                </Grid>
            </form>
        </div>
    );
};

export default PostForm;
