import React from 'react';
import { useParams } from 'react-router';

const Repository = () => {
    const {repositoryName} = useParams();
    return (
        <h1 style={{color: '#fff'}}>
            {repositoryName}
        </h1>
    );
};

export default Repository;
