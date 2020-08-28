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
import { GET_POSTS_QUERY } from '../../utils/sharedGql';

const PostForm = ({ handlePostPageClose }) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [didMount, setDidMount] = useState(false);
    const signal = axios.CancelToken.source();

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
            setErrorMessage('You have to upload at least one image');
            return;
        }
        try {
            setIsLoading(true);
            console.log('FILE', files);
            let i = 0;
            files.forEach(async (file) => {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_POSTS);
                let res;
                try {
                    res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data, {
                        cancelToken: signal.token,
                    });
                } catch (error) {
                    setIsLoading(false);
                    setAlertOpen(true);
                    throw error;
                }
                if (!res) {
                    throw new Error('Upload images went wrong');
                }
                values.images.push(res.data.secure_url);
                setValues(values);
                i++;
                console.log('VALUE', values, i, files.length);
                if (i === files.length) {
                    console.log('CREATE POST');
                    createPost();
                }
            });
            console.log('continue');
            // let images = [];
            // files.forEach((file, index) => {
            //     const data = new FormData();
            //     data.append('file', file);
            //     data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_POSTS);
            //     axios
            //         .post(process.env.REACT_APP_CLOUDINARY_URL, data)
            //         .then((res) => {
            //             values.images.push(res.data.secure_url);
            //             setValues({ ...values });
            //         })
            //         .then(() => {
            //             if (index === files.length - 1) {
            //                 console.log('created post', values);

            //                 createPost();
            //             }
            //         })
            //         .catch((error) => {
            //             setIsLoading(false);
            //             setAlertOpen(true);
            //             throw error;
            //         });
            // });
        } catch (error) {
            setIsLoading(false);
            setAlertOpen(true);
            console.error(error);
        }
    }

    console.log('POST FORM RENDER');
    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError(error) {
            console.log('CREATE POST ERROR', error);
            setIsLoading(false);
            setErrors(errorParse(error));
        },
        update(proxy, result) {
            try {
                // console.log('RESULT', result);
                const data = proxy.readQuery({
                    query: GET_POSTS_QUERY,
                    variables: { page: 1 },
                });
                console.log('DATA GET', data);
                // data.getPosts = [result.data.createPost, ...data.getPosts];
                // console.log('DATA UPDATE', data);
                proxy.writeQuery({
                    query: GET_POSTS_QUERY,
                    variables: { page: 1 },
                    data: { getPosts: [result.data.createPost, ...data.getPosts] },
                });
                setIsLoading(false);
                handlePostPageClose();
            } catch (error) {
                console.log('ERRRR', error);
                setIsLoading(false);
                setErrors(errorParse(error));
            }
        },
    });

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, []);

    if (!didMount) return null;

    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
                <Spinner open={isLoading} />

                <TextField
                    name="content"
                    error={errors && errors.content ? true : false}
                    label="Content"
                    placeholder="This is the content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors && errors.content}
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
            createdAt
            user {
                id
                name
                avatarUrl
            }
            comments {
                id
                createdAt
                comment
                user {
                    id
                    name
                    avatarUrl
                }
            }
            likes {
                id
                createdAt
                user {
                    id
                    name
                    avatarUrl
                }
            }
            commentCount
            likeCount
            isLiked
        }
    }
`;

export default PostForm;
