import React, { useState, useCallback } from 'react';
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
    DeleteButton
} from './styles';

const Main = () => {
    const [repo, setRepo] = useState('');
    const [repositoryList, setRepositoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        async function submit() {
            setLoading(true);
            try {
                const resp = await api.get(`repos/${repo}`);

                const data = {
                    name: resp.data.full_name,
                };

                setRepositoryList([...repositoryList, data]);
                setRepo('');
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        submit();
    }, [repo, repositoryList]);

    const handleDelete = useCallback(repoName => {
        const filteredRepository = repositoryList.filter(repo => repo.name !== repoName);
        setRepositoryList(filteredRepository);
    }, [repositoryList]);

    return (
      <Container>
          <h1>
              <FaGithub size={ 25 } />
              Meus repositórios
          </h1>

          <Form onSubmit={ handleSubmit }>
              <input
                  value={ repo }
                  onChange={ event => setRepo(event.target.value) }
                  type='text'
                  placeholder='user/repo'
                  required
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

                      <a href='#'>
                          <FaBars size={ 20 } />
                      </a>
                  </li>
              ))}
          </List>
      </Container>
   );
};

export default Main;
