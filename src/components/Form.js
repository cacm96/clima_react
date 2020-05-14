import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Form = ({busqueda, guardarBuqueda, guardarConsultar}) => {

    //usaremos este mismo state, lo pasaremos al componente principal y queda comentado
    //state del form
    /*const [busqueda, guardarBuqueda] = useState({
        ciudad: '',
        pais: ''
    });*/
    //state del error
    const [error, guardarError] = useState(false);

    //extraer ciudad y pais
    const {ciudad, pais} = busqueda;

    //leer lo que el usuario seleccione, pasarlas al state
    const handleChange = e => {
        //actualizar el state
        guardarBuqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    //accione al hacer submit
    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //pasar al componente principal
        guardarConsultar(true);
    }


    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
            </div>
        </form>
     );
}

Form.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBuqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}
 
export default Form;