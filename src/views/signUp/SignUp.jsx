import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import app from '../../firebase/app';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  return (
    <div className='container-fluid d-flex justify-content-center text-center'>
      <div className='row'>
        <form className='form-group' onSubmit={handleSignUp}>
          <div className='col-12'>
            <h1>Registro</h1>
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
            Registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
