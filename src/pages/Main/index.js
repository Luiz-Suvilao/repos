import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaGithub,
    FaPlus,
    FaSpinner,
    FaBars,
    FaTrash,
} from 'react-icons/fa';

import api from '../../services/api';
import {
    Container,
    Form,
    SubmitButton,
    List,
    DeleteButton,
} from './styles';

const Main = () => {
    const [repo, setRepo] = useState('');
    const [repositoryList, setRepositoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    useEffect(() => {
        const repoStorage = localStorage.getItem('allRepos');
        if (repoStorage) {
            setRepositoryList(JSON.parse(repoStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('allRepos', JSON.stringify(repositoryList));
    }, [repositoryList]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        (async function submit() {
            setLoading(true);
            setHasError(null);

            try {
                if (!repo) {
                    throw new Error('Digite um repositório primeiro');
                }

                const existingRepository = repositoryList.find(repository => repository.name === repo);
                if (existingRepository) {
                    throw new Error('Oops! Esse repositório já existe.');
                }

                const resp = await api.get(`repos/${repo}`);

                const data = {
                    name: resp.data.full_name,
                };

                setRepositoryList([...repositoryList, data]);
                setRepo('');
            } catch (error) {
                setHasError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }

        })();
    }, [repo, repositoryList]);

    const handleDelete = useCallback(repoName => {
        const filteredRepository = repositoryList.filter(repo => repo.name !== repoName);
        setRepositoryList(filteredRepository);
    }, [repositoryList]);

    return (
      <Container>
          <h1>
              <FaGithub size={ 25 } />
              My repositories
          </h1>

          <Form onSubmit={ handleSubmit } hasError={ hasError }>
              <input
                  value={ repo }
                  onChange={event => {
                      setRepo(event.target.value);
                      setHasError(null);
                  }}
                  type='text'
                  placeholder='user/repo'
              />

              <SubmitButton isLoading={ loading }>
                  {
                      loading ? <FaSpinner color='#fff' size={ 14 } /> : <FaPlus color='#fff' size={ 14 } />
                  }
              </SubmitButton>
          </Form>

          <List>
              {repositoryList.map(repo => (
                  <li key={ repo.name }>
                      <span>
                          <DeleteButton onClick={ () => handleDelete(repo.name) }>
                              <FaTrash size={ 14 } />
                          </DeleteButton>
                          { repo.name }
                      </span>

                      <Link to={ `repository/${encodeURIComponent(repo.name)}` }>
                          <FaBars size={ 20 } />
                      </Link>
                  </li>
              ))}
          </List>
      </Container>
   );
};

export default Main;
