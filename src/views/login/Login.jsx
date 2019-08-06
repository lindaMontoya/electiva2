import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../firebase/app';
import { AuthContext } from '../../routes/Auth';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/' />;
  }
  const redirect = () => {
    try {
      history.push('/signup');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className='container-fluid d-flex justify-content-center text-center'>
      <div className='row'>
        <form className='form-group' onSubmit={handleLogin}>
          <div className='col-12'>
            <h1>Iniciar sesión</h1>
          </div>
          <div className='col-12'>
            <label>
              Correo
              <input
                name='email'
                className='form-control'
                type='email'
                placeholder='Email'
              />
            </label>
          </div>

          <div className='col-12'>
            <label>
              Contraseña
              <input
                name='password'
                className='form-control'
                type='password'
                placeholder='Password'
              />
            </label>
          </div>
          <button className='btn btn-block btn-success' type='submit'>
            Iniciar sesión
          </button>
          <button className='btn btn-block btn-success' onClick={redirect}>
            Ir a registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
