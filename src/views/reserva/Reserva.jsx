import React, { Component, Fragment } from 'react';
import db from '../../firebase/firestore';
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';

class Reserva extends Component {
  state = {
    data: {},
    horarios: [],
    loading: true,
    loadingInfo: true,
    error: null,
  };

  getHorario() {
    db.collection('horarios')
      .get()
      .then((querySnapshot) => {
        var array = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          if (data.id_pelicula == this.props.match.params.id) {
            let h = {
              id: data.id,
              id_pelicula: data.id_pelicula,
              precio: data.precio,
            };
            let ho = new Array();
            data.horarios.map((horario) => {
              const date = new Date(horario.seconds * 1000);
              ho.push(date);
            });
            h = { ...h, horarios: ho };
            array.push(h);
            console.log(array);
          }
        });
        this.setState({
          horarios: array,
          loadingInfo: false,
        });
      });
  }
  get() {
    db.collection('peliculas')
      .doc(this.props.match.params.id)
      .get()
      .then((querySnapshot) => {
        const data = {
          ...querySnapshot.data(),
        };
        this.setState({
          data,
          loading: false,
        });
      });
  }
  componentDidMount() {
    this.get();
    this.getHorario();
  }
  render() {
    if (this.state.loading || this.state.loadingInfo) {
      return <Loading />;
    }
    return (
      <div className='container d-flex justify-content-center text-center'>
        <div className='row '>
          <div className='col-12'>
            <h1>{this.state.data.titulo}</h1>
            <img
              className='img-thumbnail'
              style={{ width: '500px', height: '792px' }}
              src={this.state.data.poster}
              alt={this.state.data.titulo}
            />
            <br />
            <br />
            {this.state.horarios.map((horario) => {
              return (
                <div key={horario.id}>
                  <div className='alert alert-info'>
                    Precio
                    <br /> {horario.precio}
                  </div>
                  {horario.horarios.map((h, i) => {
                    return (
                      <Link
                        key={i}
                        to={{
                          pathname: `/reserva/${this.props.match.params.id}`,
                          state: {
                            horario: h.toString(),
                            precio: horario.precio,
                            pelicula: this.state.data,
                          },
                        }}
                        className='btn btn-success btn-block'>
                        {h.toString()}
                      </Link>
                    );
                  })}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Reserva;
