import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../views/login/Login';
import SignUp from '../views/signUp/SignUp';
import Cartelera from '../views/cartelera/Cartelera';
import Reserva from '../views/reserva/Reserva';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Pelicula from '../views/reserva/Pelicula';
import Compras from '../views/compras/Compras.jsx';

class Routes extends React.Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path='/' component={Cartelera} />
            <PrivateRoute exact path='/cartelera' component={Cartelera} />
            <PrivateRoute exact path='/cartelera/:id' component={Reserva} />
            <PrivateRoute exact path='/reserva/:id' component={Pelicula} />
            <PrivateRoute exact path='/compras' component={Compras} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}
export default Routes;
