import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../base.js";
import { AuthContext } from "../../Auth";

import '../SignUp/SignUp.scss';
import '../../App.scss';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <div>
        <div className="titulo">
          <p>INICIAR SESIÓN</p>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label className="inputsauth">Email</label>
            <input type="email" className="inputs" placeholder="Email" name="email" required />
          </div>
          <br />
          <div>
            <label className="inputsauth">Pasword</label>
            <input type="password" className="inputs" placeholder="Password" name="password" required />
          </div>
          <div className="opcion">
            <button className="botones" type="submit" id="creadores">INICIAR</button>
          </div>
        </form>
        <div className="opcion">
          <h5 id="limitador">¿No tenés una cuenta?</h5>
          <button className="botones" onClick={() => history.push('/signup')}>Crear Cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);