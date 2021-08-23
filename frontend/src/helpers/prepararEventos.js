import moment from "moment";

/**
 * esto es para formatear las fechas que recibo del backend
 */
export const prepararEventos = (eventos) => {
    return eventos.map((e) =>({
        ...e,
        end: moment(e.end).toDate(),
        start: moment(e.start).toDate(),
    }))
}