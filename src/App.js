import React from 'react';
import { Route, Switch , BrowserRouter as Router } from "react-router-dom";
import SignUp from './Paginas/SignUp/SignUp.js';
import Login from './Paginas/Login/Login.js';
import Inicio from './Paginas/Inicio/Inicio.js';
import Perfil from './Paginas/Perfil/Perfil.js';
import PlanesAlimenticios from './Paginas/PlanesAlimenticios/PlanesAlimenticios.js';
import MisLogros from './Paginas/MisLogros/MisLogros.js';
import CrearPlanAlimenticio from './Paginas/CrearPlanAlimenticio/CrearPlanAlimenticio.js';
import PageNotFound from './Paginas/PageNotFound/PageNotFound.js';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact component={Inicio} />
          <PrivateRoute path="/Gimnasio" exact component={Inicio} />
          <PrivateRoute path="/planes-alimenticios" exact component={PlanesAlimenticios} />
          <PrivateRoute path="/mis-logros" exact component={MisLogros} />
          <PrivateRoute path="/crear-plan-alimenticio" exact component={CrearPlanAlimenticio} />
          <PrivateRoute path="/profile" component={Perfil} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;