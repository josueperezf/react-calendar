import { createStore, applyMiddleware, compose } from 'redux';
// la siguiente linea es del plugin para el middleware de las llamas asigcronas http
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

/*** 
 * la siguiente linea es para que si necesitamos meter mas reducer, no tengamos que cambiar el codigo mucho,
 * solo lo agregamos a la lista y ya.
 * 
 * recordemos que los store lo que hace es recibir las solicitues y en cierto modo decir que reducer hara la tarea
*/


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// mas informacion en https://github.com/zalmoxisus/redux-devtools-extension#usage
/**
 * composeEnhancers(
        applyMiddleware(thunk)
    ) es para poder manejar middleware en react
 */
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
