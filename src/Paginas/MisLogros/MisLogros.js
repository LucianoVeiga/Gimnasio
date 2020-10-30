import React from 'react';
import { withRouter } from "react-router";
import app from '../../base';
import Topbar from '../../Topbar/Topbar.js';
import { firestore } from "../../base";

import './MisLogros.css';
import '../../App.scss';
import '../PlanesAlimenticios/PlanesAlimenticios.css';

const usuarios = firestore.collection('Usuarios');
const planesalimenticios = firestore.collection('Planes Alimenticios');

class MisLogros extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pusuarioactual: '',
            pusuario: '',
            pentrenador: '',
            ppeso: '',
            pmedidas: [],
            pobjetivos: [],
            pcomidas: [],
            pfecha: ''
        }
    }

    
    componentDidMount() {
        usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
            this.setState({pusuarioactual: doc.data().nombre + " " + doc.data().apellido});
        })
        planesalimenticios
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if(doc.data().usuario === this.state.pusuarioactual && doc.data().terminado === true) {
                        this.setState({
                            pusuario: doc.data().usuario,
                            pentrenador: doc.data().entrenador,
                            ppeso: doc.data().peso,
                            pmedidas: doc.data().medidas,
                            pobjetivos: doc.data().objetivos,
                            pcomidas: doc.data().comidas,
                            pfecha: doc.data().fecha
                        })
                        let atributos = document.querySelector('#atributos');
                        let li = document.createElement('div');
                        let li1 = document.createElement('div');
                        let li2 = document.createElement('div');
                        let li3 = document.createElement('div');
                        let li4 = document.createElement('div');
                        let li5 = document.createElement('div');
                        let li6 = document.createElement('div');
                        let li7 = document.createElement('div');
                
                        let usuario = document.createElement('label');
                        let entrenador = document.createElement('label');
                        let peso = document.createElement('label');
                        let medidas = document.createElement('label');
                        let objetivos = document.createElement('label');
                        let comidas = document.createElement('label');
                        let finalizada = document.createElement('img');
                        let fecha = document.createElement('label');
                        let subt1 = document.createElement('label');
                        let subt2 = document.createElement('label');
                        let subt3 = document.createElement('label');
                        let subt4 = document.createElement('label');
                        let subt5 = document.createElement('label');
                        let subt6 = document.createElement('label');
                        let subt7 = document.createElement('label');

                        li.className = "seccion";
                        li1.id = "arriba";
                        li2.id = "arriba";
                        li3.id = "arriba";
                        li4.id = "arriba";
                        li5.id = "arriba";
                        li6.id = "dias";
                        li7.id = "fcha";
                        finalizada.src = "Images/Imagen5.png";
                        finalizada.id = "finalizada";

                        subt1.textContent = "Usuario: ";
                        subt1.className = "subt";
                        subt2.textContent = "Entrenador: ";
                        subt2.className = "subt";
                        subt3.textContent = "Peso: ";
                        subt3.className = "subt";
                        subt4.textContent = "Medidas:";
                        subt4.className = "subt";
                        subt5.textContent = "Objetivos:";
                        subt5.className = "subt";
                        subt6.textContent = "Comidas:";
                        subt6.className = "subt";
                        subt7.textContent = "Fecha: ";
                        subt7.className = "subt";
                        usuario.textContent = this.state.pusuario;
                        entrenador.textContent = this.state.pentrenador;
                        peso.textContent = this.state.ppeso;
                        medidas.textContent = this.state.pmedidas;
                        objetivos.textContent = this.state.pobjetivos;
                        comidas.textContent = this.state.pcomidas;
                        fecha.textContent = this.state.pfecha;

                        li1.appendChild(subt1);
                        li1.appendChild(usuario);
                        li2.appendChild(subt2);
                        li2.appendChild(entrenador);
                        li3.appendChild(subt3);
                        li3.appendChild(peso);
                        li4.appendChild(subt4);
                        li4.appendChild(medidas);
                        li5.appendChild(subt5);
                        li5.appendChild(objetivos);
                        li6.appendChild(subt6);
                        li6.appendChild(comidas);
                        li7.appendChild(subt7);
                        li7.appendChild(fecha);
                        li7.appendChild(finalizada);
                
                        li.appendChild(li1);
                        li.appendChild(li2);
                        li.appendChild(li3);
                        li.appendChild(li4);
                        li.appendChild(li5);
                        li.appendChild(li6);
                        li.appendChild(li7);

                        atributos.appendChild(li)
                    }
                })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Topbar />
                </div>
                <div className="contenido">
                    <p className="titulo">TUS LOGROS</p>
                    <br />
                    <ul id="atributos"></ul>
                </div>
            </div>
        );
    }
}

export default withRouter(MisLogros);