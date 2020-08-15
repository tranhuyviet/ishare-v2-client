export default (error) => {
    let errors = {};

    try {
        if (error.graphQLErrors[0].extensions.exception.errors) {
            return error.graphQLErrors[0].extensions.exception.errors;
        } else {
            errors.global = 'Something went wrong. Please try again.';
            return errors;
        }
    } catch (err) {
        errors.global = 'Something went wrong. Please try again.';
    }
};
