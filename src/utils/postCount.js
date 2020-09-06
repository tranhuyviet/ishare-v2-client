import _ from 'lodash';
export const postCount = (posts, userId) => {
    if (userId) {
        const postCount = _.filter(posts, ['user.id', userId]);
        return postCount.length;
    }
    return 0;
};
