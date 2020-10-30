import React from 'react';
import Topbar from '../../Topbar/Topbar.js';

import '../../App.scss';
import './Inicio.css';

function Inicio() {
  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className="primera">
        <div>
          <div>
            <a href="https://www.google.com.ar/maps/place/SportClub+Saavedra/@-34.5511505,-58.4714157,16z/data=!4m5!3m4!1s0x95bcb73935e8547f:0xa84f1e532bec83fe!8m2!3d-34.5510912!4d-58.4723698?hl=es&authuser=0" id="padre"><div className="localizacion" id="img3"></div></a>
          </div>
        </div>
      </div>
      <div className="segunda">
        <div className="fotossegunda">
            <div alt="foto" className="img" id="img1"></div>
            <div alt="foto" className="img" id="img2"></div>
        </div>
        <div className="texto">
          <h2>Horarios</h2>
          <label>lunes: 8 a 22hs</label>
          <br />
          <label>martes: 10 a 22hs</label>
          <br />
          <label>miercoles: 9 a 21hs</label>
          <br />
          <label>jueves: 9 a 21hs</label>
          <br />
          <label>viernes: 8 a 22hs</label>
          <br />
          <label>sabados: 9 a 15hs</label>
          <br />
          <label>domingos: 9 a 12hs</label>
        </div>
      </div>
      <div className="tercera">
        <div className="texto2">
          <h2>Precios</h2>
          <label>Semanal: $350 semanales</label>
          <br />
          <label>Mensual: $1.500 mensuales</label>
          <br />
          <label>Anual: $20.000 anuales</label>
        </div>
        <div>
          <h2 id="titulo2">¿Cómo obtener una cuenta premium?</h2>
          <div className="bloque">
            <label>LLamá al 49275953 y pedí que te envíen un email de confirmación, ahí te llegará un link que te llevará a la página de compra de premium.</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
