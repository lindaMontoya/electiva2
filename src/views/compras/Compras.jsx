import React, { Component, Fragment } from 'react';
import Loading from '../../components/loading/Loading';
import db from '../../firebase/firestore';
import app from '../../firebase/app';
import { Link } from 'react-router-dom';

class Compras extends Component {
  state = {
    compras: [],
    loading: true,
    error: null,
    user: app.auth().currentUser.uid,
  };
  get = () => {
    db.collection('compras')
      .get()
      .then((querySnapshot) => {
        var array = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          if (data.id_usuario === this.state.user) {
            array.push(data);
          }
        });
        this.setState({
          compras: array,
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.get();
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Fragment>
        {this.state.compras.map((compra) => {
          return (
            <Fragment key={compra.id}>
              <br />
              <br />
              <div className='container'>
                <div className='d-flex justify-content-center '>
                  <div className='card ' style={{ width: '30rem' }}>
                    <img
                      src={compra.poster}
                      className='card-img-top'
                      alt='...'
                    />
                    <div className='card-body'>
                      <h5 className='card-title'>{compra.pelicula}</h5>
                      <p className='card-text'>{compra.descipcion}</p>
                      <p className='card-text'>Horario: {compra.horario}</p>
                      <p className='card-text'>
                        Precio unitario: ${compra.precio_unitario}
                      </p>
                      <p className='card-text'>
                        Número de sillas: {compra.numero_sillas}
                      </p>
                      <p className='card-text'>Precio total: ${compra.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
        <br />
        <br />
        <Link className='btn btn-block btn-success' to='/'>
          Volver a cartelera
        </Link>
      </Fragment>
    );
  }
}

export default Compras;
