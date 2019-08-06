import React, { Component, Fragment } from 'react';
import app from '../../firebase/app';
import db from '../../firebase/firestore';
import Loading from '../../components/loading/Loading';
import * as admin from 'firebase-admin';

class Pelicula extends Component {
  state = {
    horario: this.props.location.state.horario,
    titulo: this.props.location.state.pelicula.titulo,
    poster: this.props.location.state.pelicula.poster,
    descipcion: this.props.location.state.pelicula.descripcion,
    precio: this.props.location.state.precio,
    id_usuario: app.auth().currentUser.uid,
    precioConDescuento: undefined,
    cupones: [],
    cuponUsado: null,
    loading: true,
    cupon: '',
    sillas: 1,
    precioConCupon: '',
    precioTotal: '',
    disabled: false,
    descontadoCupon: '',
  };
  handleChange = async (e) => {
    const name = e.target.name,
      value = e.target.value;
    await this.setState({
      [name]: value,
    });
    if (name === 'sillas') {
      await this.setState({
        precioTotal: this.state.precio * value,
      });
      await this.descuento();
    }
  };
  get() {
    db.collection('cupones')
      .get()
      .then((querySnapshot) => {
        var array = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          array.push(data);
        });
        this.setState({
          cupones: array,
          loading: false,
        });
      });
  }
  async componentDidMount() {
    await this.get();
    await this.setState({
      precioTotal: parseInt(this.state.precio * this.state.sillas),
    });
    await this.descuento();
  }
  descuento() {
    const hora = this.state.horario.split(' ');
    if (hora[4].split(':')[0] < 12) {
      this.setState({
        precioConDescuento: parseInt(
          this.state.precioTotal - this.state.precioTotal * 0.35,
        ),
      });
    }
  }
  usarCupon = async () => {
    var valido = false;
    var descuento = '';
    var porcentaje = '';
    var id_cupon = '';
    await this.state.cupones.map((cupon) => {
      if (cupon.codigo === this.state.cupon) {
        valido = true;
        descuento = cupon.valor;
        porcentaje = cupon.descuento;
        id_cupon = cupon.id;
        this.setState({ cuponUsado: cupon });
      }
    });
    await db
      .collection('cupon_usuario')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id_usuario: doc.data().id_usuario,
            id_cupon: doc.data().id_cupon,
          };
          if (
            data.id_cupon == id_cupon &&
            data.id_usuario == this.state.id_usuario
          ) {
            valido = false;
          }
        });
      });
    if (valido) {
      if (this.state.precioConDescuento) {
        await this.setState({
          precioConCupon: parseInt(
            this.state.precioConDescuento -
              this.state.precioConDescuento * descuento,
          ),
          descontadoCupon: porcentaje,
          disabled: true,
        });
      } else {
        await this.setState({
          precioConCupon: parseInt(
            this.state.precioTotal - this.state.precioTotal * descuento,
          ),
          disabled: true,
        });
      }
    } else {
      this.setState({
        cupon: '',
      });
      alert('Cupón inválido');
    }
    return valido;
  };
  comprar = () => {
    this.setState({ loading: true });
    if (this.state.cuponUsado) {
      db.collection('cupon_usuario').add({
        id_usuario: this.state.id_usuario,
        id_cupon: this.state.cuponUsado.id,
      });
    }
    db.collection('compras').add({
      pelicula: this.state.titulo,
      poster: this.state.poster,
      descipcion: this.state.descipcion,
      horario: this.state.horario,
      id_usuario: this.state.id_usuario,
      precio_unitario: this.state.precio,
      numero_sillas: this.state.sillas,
      total: this.state.precioConCupon
        ? this.state.precioConCupon
        : this.state.precioConDescuento
        ? this.state.precioConDescuento
        : this.state.precioTotal,
    });
    this.setState({ loading: false });
    this.props.history.push('/compras');
  };
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Fragment>
        <br />
        <br />
        <div className='container'>
          <div className='d-flex justify-content-center '>
            <div className='card ' style={{ width: '30rem' }}>
              <img src={this.state.poster} className='card-img-top' alt='...' />
              <div className='card-body'>
                <h5 className='card-title'>{this.state.titulo}</h5>
                <p className='card-text'>{this.state.descipcion}</p>
                <p className='card-text'>Horario: {this.state.horario}</p>
                <p className='card-text'>Precio: ${this.state.precioTotal}</p>
                {this.state.precioConDescuento ? (
                  <p className='card-text'>
                    Precio con descuento de 35%: $
                    {this.state.precioConDescuento}
                  </p>
                ) : (
                  <div />
                )}
                <label>
                  Número de puestos:
                  <input
                    type='text'
                    className='form-control'
                    onChange={this.handleChange}
                    name='sillas'
                    value={this.state.sillas}
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                </label>
                <br />

                {this.state.precioConCupon ? (
                  <p className='card-text'>
                    Precio con cupon con descuento de{' '}
                    {this.state.descontadoCupon}: ${this.state.precioConCupon}
                  </p>
                ) : (
                  <div>
                    <label htmlFor='cupon'>
                      Cupón de descuento:
                      <input
                        type='text'
                        name='cupon'
                        onChange={this.handleChange}
                        className='form-control'
                        value={this.state.cupon}
                      />
                    </label>
                    <button
                      onClick={this.usarCupon}
                      className='btn btn-success'>
                      Redimir cupon
                    </button>
                  </div>
                )}
                <br />
                <button
                  className='btn btn-primary btn-block'
                  onClick={this.comprar}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Pelicula;
