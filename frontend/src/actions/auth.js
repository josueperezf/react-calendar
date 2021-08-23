import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

/**
 * cuando el usuario presiona login, llama a la funcion startLogin,
 * esta es una funcion anonima, que recibe como parametro u dispatch, al terminar de hacer la peticion al servidor,
 * usando el dispatch llama a la funcion login, que lo que hace es invoicar al reducer de auth, en el case authLogin,
 * pasandole como parametro lo que necesita, este reducer 'authreducer'  actualiza el state del proyecto, en este caso la variable auth
 */
// asincrono, llamada a servidor
export const startLogin = (email, password) => {
    return async(dispatch) => {
        const respuesta = await fetchSinToken('auth',{ email, password}, 'POST');
        const body      = await respuesta.json();
        if (body.ok) {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login(
                {
                    uid:body.uid,
                    name:body.name,
                }))
        } else {
            if (body?.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                Swal.fire('Error', 'Ha ocurrido un problema, por favor verifica', 'error');
            }
        }
    }
}

// asincrono

export const startRegister = (email, password, name) => {
    return async(dispatch) => {
        const respuesta = await fetchSinToken('auth/new',{ email, password, name}, 'POST');
        const body      = await respuesta.json();
        if (body.ok) {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            // startLogin(email, password);
            dispatch(login(
                {
                    uid:body.uid,
                    name:body.name,
                }))
        } else {
            if (body?.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                Swal.fire('Error', 'Ha ocurrido un problema al registar', 'error');
            }
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('auth/renew',{ });
        const body      = await respuesta.json();
        if (body.ok) {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login(
                {
                    uid:body.uid,
                    name:body.name,
                }))
        } else {
            console.log(' ocurre cuando no hay token en la peticion o token invalido');
            dispatch(checkingFinish());
        }
    }
}

// no es  asincronada, pero fernando la colocar asi
export const startLogout = () => {
    return async(dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
}

const checkingFinish = () => ({type:types.authCheckingFinish})

const login = (user) => ({
    type:types.authLogin,
    payload: user
});

const logout = () => ({type:types.authLogout });