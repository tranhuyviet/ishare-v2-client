import React, { createContext, useState } from 'react';

const UIContext = createContext();

const UIContextProvider = (props) => {
    const [tabValue, setTabValue] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [postsOfUserId, setPostsOfUserId] = useState();

    return (
        <UIContext.Provider
            value={{
                tabValue,
                setTabValue,
                postCount,
                setPostCount,
                postsOfUserId,
                setPostsOfUserId,
            }}
        >
            {props.children}
        </UIContext.Provider>
    );
};

export { UIContextProvider, UIContext };
