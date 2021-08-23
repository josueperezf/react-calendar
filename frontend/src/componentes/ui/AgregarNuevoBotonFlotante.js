import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AgregarNuevoBotonFlotante = () => {
    const dispatch = useDispatch();
    // uiOpenModal
    const handlerAddEvent = () => {
        dispatch(uiOpenModal());
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handlerAddEvent}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
