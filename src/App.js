import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';


function App() {

  //state del form
  const [busqueda, guardarBuqueda] = useState({
    ciudad: '',
    pais: ''
  });
  //state que realiza la consulta a la api cuando su estado cambie a true
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  //extraer ciudad y pais
  const {ciudad, pais} = busqueda;

  useEffect(() => {
   
    if(consultar) {
      const consultarAPI = async () => {
        const appID = '4eb8900fe6e9efc7b58b79a99873aaaa';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appID}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);
        guardarConsultar(false);

        //detecta si hubo resultados correctos en la consulta
        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
      consultarAPI();
    }

    // eslint-disable-next-line
  }, [consultar]);

  //carga condicional de componentes
  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultado" />
  } else {
    componente =  <Weather resultado={resultado} />
  }


  return (
    <Fragment>
      <Header 
        titulo='Clima'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                busqueda={busqueda}
                guardarBuqueda={guardarBuqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
             
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
