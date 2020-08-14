export default (error) => {
    let errors = {};

    try {
        if (error.graphQLErrors[0].extensions.exception.errors) {
            return error.graphQLErrors[0].extensions.exception.errors;
        }
    } catch (err) {
        errors.global = 'Something went wrong. Please try again.';
    }

    return errors;
};
