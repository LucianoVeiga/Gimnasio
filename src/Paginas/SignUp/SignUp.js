import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../base";
import { firestore } from "../../base";
import { AuthContext } from "../../Auth";

import './SignUp.scss';
import '../../App.scss';

const SignUp = ({ history }) => {
    const usuarios = firestore.collection("Usuarios");
    const [user, setUser] = useState({});
    const { currentUser } = useContext(AuthContext);

    const handleChange = async e => {
      setUser(Object.assign(user, { [e.target.name] : e.target.value }));
    };

    const handleSignUp = (async event => {
      event.preventDefault();
      const { email, password } = user;
      try {
        await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
        usuarios.doc(app.auth().currentUser.uid).set(user);
        history.push("/");
        console.log(user);
      } catch (error) {
      alert(error);
      }
    });

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form-container">
        <div>
          <div className="titulo">
            <p>REGISTRARSE</p>
          </div>
          <form onSubmit={handleSignUp}>
            <div>
              <label className="inputsauth">Email</label>
              <input type="input" className="inputs" placeholder="Email" name="email" id='name' onChange={handleChange} required />
            </div>
            <br />
            <div>
              <label className="inputsauth">Pasword</label>
              <input type="password" className="inputs" placeholder="Password" name="password" id='name' onChange={handleChange} required />
            </div>
            <br />
            <div>
              <label className="inputsauth">Nombre</label>
              <input type="input" className="inputs" placeholder="Nombre" name="nombre" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <label className="inputsauth">Apellido</label>
              <input type="input" className="inputs" placeholder="Apellido" name="apellido" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <label className="inputsauth">Fecha de Nacimiento</label>
              <input type="input" className="inputs" placeholder="Fecha de nacimiento" name="nacimiento" id="nacimiento" onChange={handleChange} required />
            </div>
            <br />
            <div>
              <label className="inputsauth">País</label>
              <input type="input" className="inputs" placeholder="País" name="pais" onChange={handleChange} required />
            </div>
            <br />
            <div>
            <label className="inputsauth">Sexo</label>
              <select className="inputs" name="sexo" id="sexo" defaultValue="Sexo" onChange={handleChange} required>
                <option value="Sexo" disabled selected></option>
                <option value="Masculino">Hombre</option>
                <option value="Femenino">Mujer</option>  
              </select>
            </div>
            <br />
            <div>
              <label className="inputsauth">Tipo de cuenta</label>
                <select className="inputs" name="cuenta" id="cuenta" defaultValue="Tipo de Cuenta" onChange={handleChange} required>
                  <option value="Tipo de Cuenta" disabled selected></option>
                  <option value="Común">Común</option>
                  <option value="Entrenador">Entrenador</option>  
                </select>
            </div>
            <br />
            <div className="opcion">
              <button className="botones" type="submit" id="creadores">CREAR</button>
            </div>
          </form>
          <div className="opcion">
            <h5 id="limitador">¿Ya tenés una cuenta?</h5>
            <button className="botones" onClick={() => history.push('/login')}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
      );
    };  


  export default withRouter(SignUp);