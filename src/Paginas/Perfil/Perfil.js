import React from "react";
import { firestore } from "../../base";
import app from "../../base.js";
import Topbar from "../../Topbar/Topbar.js";

import './Perfil.css';
import '../../App.scss';

const usuarios = firestore.collection('Usuarios');

class Perfil extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      pnombre: '',
      papellido: '',
      ppais: '',
      pnacimiento: '',
      pemail: app.auth().currentUser.email,
      psexo: '',
      pcuenta: ''
    }
  }


  componentDidMount() {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      this.setState({
        pnombre: doc.data().nombre,
        papellido: doc.data().apellido,
        ppais: doc.data().pais,
        pnacimiento: doc.data().nacimiento,
        psexo: doc.data().sexo,
        pcuenta: doc.data().cuenta
      });
    })
  }

  handleUpdate = () => {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      usuarios.doc(app.auth().currentUser.uid).update({
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        pais: document.getElementById('pais').value,
        nacimiento: document.getElementById('nacimiento').value,
        sexo: document.getElementById('sexo').value,
        email: document.getElementById('email').value,
        cuenta: document.getElementById('cuenta').value
      })
      console.log(doc.data().sexo, doc.data().cuenta)
    })
    app.auth().currentUser.updateEmail(document.getElementById('email').value);
    console.log('¡Actualizado!');
  }

  handleDelete = () => {
    app.auth().currentUser.delete();
    usuarios.doc(app.auth().currentUser.uid).delete();
    console.log('¡Eliminado!');
  }

  render() {
    return (
      <div>
        <div>
          <Topbar />
        </div>
        <div className="content">
          <div>
            <div>
              <p id="tituloperfil">MI PERFIL</p>
              <label className="subtitulo">Personalizá la información de tu perfil acá.</label>
            </div>
            <br />
              <div>
                <label className="inputsauth">Nombre</label>
                <input type="input" className="inputs" defaultValue={this.state.pnombre} placeholder="Nombre" name="nombre" id="nombre" />
              </div>
              <br />
              <div>
                <label className="inputsauth">Apellido</label>
                <input type="input" className="inputs" defaultValue={this.state.papellido} placeholder="Apellido" name="apellido" id="apellido" />
              </div>
              <br />
              <div>
                <label className="inputsauth">Email</label>
                <input type="input" className="inputs" defaultValue={this.state.pemail} placeholder="Email" name="email" id="email" />
              </div>
              <br />
              <div>
                <label className="inputsauth">País</label>
                <input type="input" className="inputs" defaultValue={this.state.ppais} placeholder="País" name="pais" id="pais" />
              </div>
              <br />
              <div>
                <label className="inputsauth">Fecha de Nacimiento</label>
                <input type="input" className="inputs" defaultValue={this.state.pnacimiento} placeholder="Fecha de nacimiento" name="nacimiento" id="nacimiento" />
              </div>
              <br />
              <div>
              <label className="inputsauth">Sexo</label>
                <select className="inputs" name="sexo" id="sexo" defaultValue={this.state.psexo}>
                  <option value="Masculino">Hombre</option>
                  <option value="Femenino">Mujer</option>  
                </select>
              </div>
              <br />
              <div>
                <label className="inputsauth">Tipo de cuenta</label>
                  <select className="inputs" name="cuenta" id="cuenta" defaultValue={this.state.pcuenta}>
                    <option value="Común">Común</option>
                    <option value="Entrenador">Entrenador</option>  
                  </select>
              </div>
              <br />
              <div className="opcion">
                <button className="botones" id="creadores" onClick={(this.handleUpdate)}>GUARDAR</button>
              </div>
            <div className="opcion">
              <button className="botones" id="logout" onClick={() => app.auth().signOut()}>LOGOUT</button>
              <button className="botones" id="borrar" onClick={(this.handleDelete)}>Borrar Cuenta</button>
            </div>
          </div>
        </div>
      </div>
    );
    }
};

export default Perfil;