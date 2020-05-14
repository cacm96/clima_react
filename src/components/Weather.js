import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({resultado}) => {

    //extraer los valores
    const {main, name} = resultado;

    if(!name) return null

    //grados kelvin
    const kelvin = 273.15;

    return ( 
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <p className="temperatura">
                    {parseFloat(main.temp - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Temperatura máxima:  {parseFloat(main.temp_max - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Temperatura mínima:  {parseFloat(main.temp_min - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Sensación térmica:  {parseFloat(main.feels_like - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Humedad:  {main.humidity} %
                </p>
            </div>
        </div>
     );
}
Weather.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
 
export default Weather;