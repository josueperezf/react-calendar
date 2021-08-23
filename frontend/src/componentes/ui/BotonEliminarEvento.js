import React from 'react'
import { useDispatch,
    // useSelector
} from 'react-redux';
import { eventStartDeleted } from '../../actions/events';

export const BotonEliminarEvento = () => {
    const dispatch = useDispatch();
    // const {eventoActivo} = useSelector(state => state.calendar);

    const handlerDelete = () => {
        //dispatch(eventStartDeleted(eventoActivo.id));
        dispatch(eventStartDeleted());
    }
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handlerDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    )
}
