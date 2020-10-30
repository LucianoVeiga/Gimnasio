import React from 'react';
import { withRouter } from "react-router";
import app from '../../base';
import Topbar from '../../Topbar/Topbar.js';
import { firestore } from "../../base";

import './CrearPlanAlimenticio.css';
import '../../App.scss';

const usuarios = firestore.collection('Usuarios');
const planesalimenticios = firestore.collection('Planes Alimenticios');

class CrearPlanAlimenticio extends React.Component {

    constructor(props) {
        super(props);
        this.agregarMedida = this.agregarMedida.bind(this);
        this.agregarObjetivo = this.agregarObjetivo.bind(this);
        this.agregarComida = this.agregarComida.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            entrenador: '',
            medidas: [],
            objetivos: [],
            comidas: []
        }
    }

    
    componentDidMount() {
        usuarios.doc(app.auth().currentUser.uid).get().then(doc =>{
            this.setState({entrenador: doc.data().nombre + " " + doc.data().apellido});
            if(doc.data().cuenta === "Común") {
                window.location.href = "/";
            }
        })
    }

    agregarMedida() {
        let med;
        const parte = document.getElementById('parte').value;
        const medida = document.getElementById('medida').value;
        const parteconmedida = " " + parte + ": " + medida;
        med = this.state.medidas;
        med.push(parteconmedida);
        this.setState({medidas: med});
        document.getElementById('parte').value = '';
        document.getElementById('medida').value = '';

        let meds = document.querySelector('#meds');
        let li = document.createElement('div');

        let agregado = document.createElement('label');
        
        li.className = "datosagregados";

        agregado.textContent = parteconmedida;
        
        li.appendChild(agregado);

        meds.appendChild(li);
    }

    agregarObjetivo() {
        let obj;
        const objetivo = " " + document.getElementById('objetivo').value;
        obj = this.state.objetivos;
        obj.push(objetivo);
        this.setState({objetivos: obj});
        document.getElementById('objetivo').value = '';

        let objs = document.querySelector('#objs');
        let li = document.createElement('div');

        let agregado = document.createElement('label');
        
        li.className = "datosagregados";

        agregado.textContent = objetivo;
        
        li.appendChild(agregado);

        objs.appendChild(li);
    }

    agregarComida() {
        let com;
        const dia = document.getElementById('dia').value;
        const horario = document.getElementById('horario').value;
        const comida = document.getElementById('comida').value;
        const horarioconcomida = " (" + dia + ": " + horario + " " + comida + ")";
        com = this.state.comidas;
        com.push(horarioconcomida);
        this.setState({
            comidas: com
        })
        document.getElementById('dia').value = '';
        document.getElementById('horario').value = '';
        document.getElementById('comida').value = '';

        let coms = document.querySelector('#coms');
        let li = document.createElement('div');

        let agregado = document.createElement('label');
        
        li.className = "datosagregados";

        agregado.textContent = horarioconcomida;
        
        li.appendChild(agregado);

        coms.appendChild(li);
    }

    handleUpload() {
        const pusuario = document.getElementById("usuario").value;
        const ppeso = document.getElementById("peso").value;
        let dia = new Date();
        const fecha = " " + dia.getDate() + "/" + (dia.getMonth() + 1) + "/" + dia.getFullYear();
        planesalimenticios.add({
            entrenador: this.state.entrenador,
            usuario: pusuario,
            peso: ppeso,
            medidas: this.state.medidas,
            objetivos: this.state.objetivos,
            comidas: this.state.comidas,
            fecha: fecha,
            terminado : false
        }).then(
            setTimeout(function () {
                window.location.href = "/";
            }, 2000))
    }

    render() {
        return (
            <div>
                <div>
                    <Topbar />
                </div>
                <div className="contenido">
                    <p className="titulo">CREA UN PLAN ALIMENTICIO</p>
                    <div>
                        <label className="inputsauth">Usuario</label>
                        <input type="input" className="inputs" placeholder="Usuario al que le quieras dar el plan alimenticio" name="usuario" id="usuario" required />
                    </div>
                    <br />
                    <div>
                        <label className="inputsauth">Peso</label>
                        <input type="input" className="inputs" placeholder="Peso actual del usuario" name="peso" id="peso" required />
                    </div>
                    <br />
                    <div>
                        <label className="inputsauth">Medidas</label>
                        <div className="secciones">
                            <input type="input" className="inputs" placeholder="Parte de cuerpo" name="parte" id="parte" required />
                            <input type="input" className="inputs" placeholder="Medida de la parte" name="medida" id="medida" required />
                            <button className="botones" id="agregado" onClick={this.agregarMedida}>Agregar Medida</button>
                        </div>
                    </div>
                    <ul id="meds"></ul>
                    <br />
                    <div>
                        <label className="inputsauth">Objetivos</label>
                        <div className="secciones">
                            <input type="input" className="inputs" placeholder="Objetivo" name="objetivo" id="objetivo" required />
                            <button className="botones" id="agregado" onClick={this.agregarObjetivo}>Agregar Objetivo</button>
                        </div>
                    </div>
                    <ul id="objs"></ul>
                    <br />
                    <div>
                        <label className="inputsauth">Comidas</label>
                        <div className="secciones">
                            <input type="input" className="inputs" placeholder="Dia" name="dia" id="dia" required />
                            <input type="input" className="inputs" placeholder="Horario de comida" name="horario" id="horario" required />
                            <input type="input" className="inputs" placeholder="Comida" name="comida" id="comida" required />
                            <button className="botones" id="agregado" onClick={this.agregarComida}>Agregar Comida</button>
                        </div>
                    </div>
                    <ul id="coms"></ul>
                    <br />
                    <div className="opcion">
                        <button className="botones" id="creadores" onClick={this.handleUpload}>Crear plan alimenticio</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CrearPlanAlimenticio);