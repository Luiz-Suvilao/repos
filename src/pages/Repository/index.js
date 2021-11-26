import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaArrowLeft, FaSmileWink } from 'react-icons/fa';

import LoadingDots from '../../components/LoadingDots';
import filters from '../../utils/filters';

import api from '../../services/api';

import {
    Container,
    Loading,
    BackButton,
    Owner,
    FilterList,
    IssuesList,
    PageActions
} from './styles';

const Repository = () => {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filterIndex, setFilterIndex] = useState(0);

    const { repositoryName } = useParams();

    useEffect(() => {
        (async function load() {
            const [repositoryData, issuesData] = await Promise.all([
                api.get(`/repos/${repositoryName}`),
                api.get(`/repos/${repositoryName}/issues`, {
                    params: {
                        state: filters.find(filter => filter.active).state,
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
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5
                },
            });

            setIssues(repositoryData.data);
        })();
    }, [filterIndex, filters, repositoryName, page]);

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
            <BackButton to='/repos'>
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

            <FilterList active={ filterIndex }>
                {filters.map((filter, index) => (
                    <button
                        disabled={ issues.length < 1 }
                        key={ index }
                        onClick={ () => setFilterIndex(index) }
                    >
                        { filter.label }
                    </button>
                ))}
            </FilterList>

            <IssuesList>
                {issues.length < 1 && (
                    <h2>
                        No issues found
                        <FaSmileWink size={ 25 } />
                    </h2>
                )}
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
                    Previous
                </button>

                <button
                    disabled={ issues.length < 1 }
                    type='button'
                    onClick={ () => setPage(page + 1) }
                >
                    Next
                </button>
            </PageActions>
        </Container>
    );
};

export default Repository;
