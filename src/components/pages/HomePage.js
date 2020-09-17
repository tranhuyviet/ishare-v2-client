import React from 'react';
import Banner from '../Header/Banner';
import TabBar from '../Header/TabBar';
import PostList from '../shared/PostList';

const HomePage = () => {
    // const [tabValue, setTabValue] = useState(0);

    return (
        <div>
            <Banner />
            <TabBar />
            <PostList />
        </div>
    );
};

export default HomePage;
