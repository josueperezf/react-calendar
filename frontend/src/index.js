import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import './styles.css'
// con la siguiente linea vemos que variables de entorno esta tomando, si las de desarrollo o las de produccion
//console.log(process.env);
ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);
