import React, { Component } from 'react';
import Loading from '../../components/loading/Loading';
import app from '../../firebase/app';
import db from '../../firebase/firestore';
import { Link } from 'react-router-dom';
class Cartelera extends Component {
  state = {
    session: app.auth().currentUser,
    data: [],
    loading: true,
    error: null,
  };
  get() {
    db.collection('peliculas')
      .get()
      .then((querySnapshot) => {
        var array = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            titulo: doc.data().titulo,
            poster: doc.data().poster,
            descripcion: doc.data().descripcion,
          };
          array.push(data);
        });
        this.setState({
          data: array,
          loading: false,
        });
      });
  }
  cerrarsesion = () => {
    this.setState({
      loading: true,
    });
    app
      .auth()
      .signOut()
      .then(() => {
        this.setState({
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
      <div className='container d-flex justify-content-center text-center'>
        <div className='col-12'>
          <div className='container'>
            <div className='row'>
              {this.state.data.map((pelicula) => {
                return (
                  <div className='col-12 col-md-6 col-lg-4' key={pelicula.id}>
                    <Link
                      to={`/cartelera/${pelicula.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}>
                      <div className='card' style={{ marginBottom: '15px' }}>
                        <img
                          className='img-thumbnail'
                          src={pelicula.poster}
                          alt={pelicula.titulo}
                          style={{ height: '30em' }}
                        />
                        <h2>{pelicula.titulo}</h2>
                        <p>{pelicula.descripcion}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <Link className='btn btn-block btn-success' to='/compras'>
            Mis compras
          </Link>
          <br />
          <button
            className='btn btn-block btn-danger'
            onClick={this.cerrarsesion}>
            cerrar sesion
          </button>
        </div>
      </div>
    );
  }
}

export default Cartelera;
