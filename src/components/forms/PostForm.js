import React, { useState, useEffect } from 'react';
import { useStyles } from './PostForm.style';
import { TextField, CircularProgress, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';

import { useFormik } from 'formik';
import MyButton from '../shared/MyButton';
import UploadImage from '../shared/UploadImage';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import errorParse from '../../utils/errorParse';
import { createPostSchema } from '../../schemas/postSchema';
import Spinner from '../shared/Spinner';
import Alert from '../shared/Alert';

const PostForm = ({ handlePostPageClose }) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

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
        if (!files || files.length === 0) {
            console.log('cac');
            setErrorMessage('You have to upload at least one image');
            return;
        }
        try {
            setIsLoading(true);
            console.log('FILE', files);
            files.forEach(async (file, index) => {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_POSTS);
                let res;
                try {
                    res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
                } catch (error) {
                    setIsLoading(false);
                    setAlertOpen(true);
                    throw error;
                }
                values.images.push(res.data.secure_url);
                setValues(values);
                if (index === files.length - 1) {
                    createPost();
                }
            });
        } catch (error) {
            setIsLoading(false);
            setAlertOpen(true);
            console.error(error);
        }
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError(error) {
            console.log('CREATE POST ERROR', error);
            setIsLoading(false);
            setErrors(errorParse(error));
        },
        update(proxy, result) {
            console.log('CREATE POST RESULT', result);
            setIsLoading(false);
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
                <Spinner open={isLoading} />

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
                    errorMessage={errorMessage}
                />

                <Grid container justify="flex-end" style={{ paddingTop: 16, paddingBottom: 16 }}>
                    <MyButton title="Cancel" onClick={() => handlePostPageClose()} />
                    <MyButton title="Post" type="submit" style={{ marginLeft: 16 }} />
                </Grid>
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={6000}
                    onClose={() => setAlertOpen(false)}
                >
                    <Alert onClose={() => setAlertOpen(false)} severity="error">
                        Something went wrong. Please try again.
                    </Alert>
                </Snackbar>
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
