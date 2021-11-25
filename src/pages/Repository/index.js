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
    IssuesList,
    PageActions
} from './styles';

const Repository = () => {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

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

    useEffect(() => {
        (async function loadNewIssues() {
            const repositoryData = await api.get(`/repos/${repositoryName}/issues`, {
                params: {
                    state: 'open',
                    page,
                    per_page: 5
                },
            });

            setIssues(repositoryData.data);
        })();
    }, [repositoryName, page]);

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

            <IssuesList>
                {issues.map(issue => {
                    const {
                        user: { avatar_url, login },
                        html_url,
                        title,
                        labels
                    } = issue;

                    return (
                        <li key={ String(issue.id) }>
                            <img
                                src={ avatar_url }
                                alt={ login }
                            />

                            <div>
                                <strong>
                                    <a href={ html_url }>
                                        { title }
                                    </a>

                                    {labels.length && labels.map(label => (
                                        <span key={ String(label.id) }>
                                            { label.name }
                                        </span>
                                    ))}
                                </strong>

                                <p>{ login }</p>
                            </div>
                        </li>
                    );
                })}
            </IssuesList>

            <PageActions>
                <button
                    disabled={ page <= 1 }
                    type='button'
                    onClick={ () => setPage(page - 1) }
                >
                    Voltar
                </button>

                <button
                    type='button'
                    onClick={ () => setPage(page + 1) }
                >
                    Avançar
                </button>
            </PageActions>
        </Container>
    );
};

export default Repository;
