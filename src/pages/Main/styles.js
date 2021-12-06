import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div `
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    
    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form `
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  
  input {
    flex: 1;
    border: 1px solid ${ props => (props.hasError ? '#b53737' : '#eee') };
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
    transition: all 0.7s;
    
    &::placeholder {
      color: ${ props => (props.hasError ? '#b53737' : '#ccc') };
    }
  }
  
  button {
    transition: all 0.7s;
    background: ${ props => props.hasError ? '#b53737' : '#0d2636' };
  }
`;

const loadingAnimation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.isLoading
}))`
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.isLoading &&
    css`
      svg {
        animation: ${ loadingAnimation } 2s linear infinite;
      }
    `
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;
  
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    & + li {
      border-top: 1px solid #eee;
    }
    
    span {
      font-family: 'Montserrat';
      font-style: italic;
      font-weight: bold;
    }
    
    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
  padding: 8px 7px;
  background: transparent;
  color: #0d2636;
  border: 0;
  outline: 0;
  
  & svg {
    transition: all 0.7s;

    &:hover {
      color: #b53737;
    }
  }
`;
