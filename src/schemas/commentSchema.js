import * as Yup from 'yup';

const comment = Yup.string().required();

export const commentSchema = Yup.object({
    comment,
});
