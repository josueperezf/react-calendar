import { types } from "../types/types";

const initialState = {
    eventos : [],
    eventoActivo: null // en teoria va a ser un objeto
};
export const calendarReducer = (state =  initialState, action) => {
    switch (action.type) {
        case types.eventAddNew:
            // console.log(state.eventos.push(action.payload));
            return {
                ...state,
                eventos: [...state.eventos, action.payload ]
            };
        case types.eventSetActive:
            return {
                ...state,
                eventoActivo:action.payload
            };
        case types.eventClearActiveEvent:
            return {
                ...state,
                eventoActivo: null
            };
        case types.eventUpdated:
            return {
                ...state,
                eventos: state.eventos.map((e) => (e.id === action.payload.id) ? action.payload: e )
            };
        case types.eventDeleted:
            return {
                ...state,
                eventos: state.eventos.filter((e) => (e.id !== state.eventoActivo.id)),
                eventoActivo: null
            };
        case types.eventLoaded:
            return {
                ...state,
                eventos: [...action.payload]
            };
        case types.eventLogout:
            return {
                initialState
            };
        default:
            return state;
    }
}