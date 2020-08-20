import React, { useState, useEffect } from 'react';
import { useStyles } from './PostForm.style';
import { TextField, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';

import { useFormik } from 'formik';
import MyButton from '../shared/MyButton';
import UploadImage from '../shared/UploadImage';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import errorParse from '../../utils/errorParse';
import { createPostSchema } from '../../schemas/postSchema';

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
        setValues,
        // touched,
        // setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: createPostSchema,
    });

    function onSubmit() {
        console.log('Submit');

        files.forEach(async (file, index) => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_POSTS);
            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
            values.images.push(res.data.secure_url);
            setValues(values);
            if (index === files.length - 1) {
                createPost();
            }
        });
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError(error) {
            console.log('CREATE POST ERROR', error);
            setErrors(errorParse(error));
        },
        update(proxy, result) {
            console.log('CREATE POST RESULT', result);
            handlePostPageClose();
        },
    });

    // useEffect(() => {
    //     console.log('use effect', files.length);
    //     if (files.length > 0) {
    //         delete errors.images;
    //         console.log('errors', errors);
    //         setErrors(errors);
    //     }
    // }, [files, errors, setErrors]);

    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
                {loading && <CircularProgress />}
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
                <UploadImage
                    files={files}
                    setFiles={setFiles}
                    multiple
                    text="Upload your images"
                    errorMessage={errors.images}
                />

                <Grid container justify="flex-end" style={{ paddingTop: 16, paddingBottom: 16 }}>
                    <MyButton title="Cancel" onClick={() => handlePostPageClose()} />
                    <MyButton title="Post" type="submit" style={{ marginLeft: 16 }} />
                </Grid>
            </form>
        </div>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($content: String!, $images: [String!]!) {
        createPost(content: $content, images: $images) {
            id
            content
            images
            user {
                name
                avatarUrl
            }
            createdAt
        }
    }
`;

export default PostForm;
