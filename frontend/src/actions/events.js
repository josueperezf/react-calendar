import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEventos } from "../helpers/prepararEventos";
import { types } from "../types/types";


/**
 * lo que tiene export es lo que llamo desde fuera, lo que no, solo lo uso en este archivo, se que es tonto, pero aclaro
*/
// asincrono
export const eventStartAddNew = (e) => {
    return async (dispatch, getState) => {
        const {uid, name } = getState().auth;
        try {
            const respuesta =  await fetchConToken('eventos', e, 'POST');
            const body = await respuesta.json();
            if (body?.ok) {
                e.id = body.evento.id;
                e.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(e));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (e) =>({
    type: types.eventAddNew,
    payload: e
});

export const eventSetActive = (e) =>({
    type: types.eventSetActive,
    payload: e
});

// para eliminar la nota activa cuando seleccionan otra
export const eventClearActiveEvent = () =>({type: types.eventClearActiveEvent});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const respuesta =  await fetchConToken(`eventos/${event.id}`, event, 'PUT');
            const body = await respuesta.json();
            // console.log(body);
            if (body?.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body?.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated = (e) =>({
    type: types.eventUpdated,
    payload: e
});

// para eliminar el evento o nota activa
//export const eventStartDeleted = (id) => {
export const eventStartDeleted = () => {
    /**
     * para eliminar necesito id, tengo dos opciones,
     * 1. usar un useSelect en el componente que llama a este evento y tomar el id, y pasarlo a esta funcion,
     * 2 hacer que esta funcion, funto al dispatch tenga el getState, y de alli tomar el id, esta ultima es la qye hace fernando
     * 
     * como existe un state llamado calendar, que tiene todos los eventos, y un campo llamado eventoActivo, de alli tomo el id que eliminare
     */
    // return async (dispatch) => {
    return async (dispatch, getState) => {
        const {id} = getState().calendar.eventoActivo;
        try {
            const respuesta =  await fetchConToken(`eventos/${id}`, {id}, 'DELETE');
            const body = await respuesta.json();
            // console.log(body);
            if (body?.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body?.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () =>({type: types.eventDeleted });


export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const respuesta =  await fetchConToken('eventos');
            const body = await respuesta.json();
            // console.log(body);
            if (body?.ok) {
                const eventos = prepararEventos(body.eventos);
                // const eventos =  body.eventos;
                dispatch(eventLoaded(eventos));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (e) => ({
    type: types.eventLoaded,
    payload: e
})

export const eventLogout = () => ({type:types.eventLogout});