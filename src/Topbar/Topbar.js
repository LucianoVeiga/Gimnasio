import React from 'react';
import app from '../base';
import { firestore } from "../base";

import '../App.scss';
import './Topbar.css';

const usuarios = firestore.collection('Usuarios');

class Topbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: ''
    }
  }

  componentDidMount() {
    usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
      this.setState({usuario: doc.data().nombre + " " + doc.data().apellido});
      if(doc.data().cuenta === "Común") {
        document.getElementById("crear").hidden = true;
      }
      if(doc.data().cuenta === "Entrenador") {
        document.getElementById("logros").hidden = true;
        document.getElementById("crear").hidden = false;
      }
    })
  }

  render() {
    return (
      <header>
        <a href="/"><button className="boton">Inicio</button></a>
        <a href="/planes-alimenticios"><button className="boton">Planes alimenticios</button></a>
        <a href="/mis-logros"><button id="logros" className="boton">Mis logros</button></a>
        <a href="/crear-plan-alimenticio"><button id="crear" className="boton">Crear plan alimenticio</button></a>
        <a href="/profile"><button className="boton" style={{float: "right"}}>Perfil</button></a>
        <button onClick={() => app.auth().signOut()} className="boton" id="logout" style={{float: "right"}}>Logout</button>
        <label className="nbre">{this.state.usuario}</label>
      </header>
    );
  }
}

export default Topbar;
