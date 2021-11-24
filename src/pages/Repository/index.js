import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

import LoadingDots from '../../components/LoadingDots';

import api from '../../services/api';

import {
    Container,
    Loading,
    BackButton,
    Owner,
} from './styles';

const Repository = () => {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const { repositoryName } = useParams();

    useEffect(() => {
        (async function load() {
            const [repositoryData, issuesData] = await Promise.all([
                api.get(`/repos/${repositoryName}`),
                api.get(`/repos/${repositoryName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            setRepository(repositoryData.data);
            setIssues(issuesData.data);
            setLoading(false);
        })();
    }, [repositoryName]);
    console.log(repository, issues, loading);
    if (loading) {
       return (
           <Loading>
               <h1>Loading <LoadingDots dotsColor='#fff' /></h1>
           </Loading>
       );
    }

    const {
        owner: { avatar_url, login },
        name,
        description
    } = repository;

    return (
        <Container>
            <BackButton to='/'>
                <FaArrowLeft color='#000' size={ 35 } />
            </BackButton>

            <Owner>
                <img
                    src={ avatar_url }
                    alt={ login }
                />

                <h1>{ name }</h1>
                <p>{ description }</p>
            </Owner>
        </Container>
    );
};

export default Repository;
