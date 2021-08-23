import React, { useEffect, useState } from 'react'
import { NavBar } from '../ui/NavBar'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AgregarNuevoBotonFlotante } from '../ui/AgregarNuevoBotonFlotante';
import { BotonEliminarEvento } from '../ui/BotonEliminarEvento';
moment.locale('es');
const localizer = momentLocalizer(moment)
/*const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end:   moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
        _id: '1234',
        name: 'Fernando'
    }
    // la informacion que esta en este return, sera enviada al compoente CalendarEvent que nosotros definimos
}];*/
export const CalendarScreen = () => {
    // la siguiente linea es para que tenga la ultima seccion visitada del calendario, si no tiene nada, entonces que abra el mes
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();
    const { eventoActivo } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );
    const { eventos: events } = useSelector( state => state.calendar );

    /**
     * 
     * para traer la data de la base de datos, esto se llamara solo una vez
     */
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick = (e) => {
        console.log('doble click');
        dispatch(uiOpenModal());
    }
    const onSelect = (e) => {
        console.log('seleccionado');
        dispatch(eventSetActive(e));
    }
    const onViewChange  = (e) => {
        // estpo es para que al cambiar de pestaña, almacene en localStorage la pestaña que visito, por si recarga la pagina no pierda el lugar donde estaba
        setlastView(e)
        localStorage.setItem('lastView', e);
    }

    const onSelectFuera = (e) => {
        // si hace click fuera de algun evento, quitp el evento que este como activo, con ello desaparece el boton eliminar
        // esto serviria para hacer que por ejemplo, se abra el modal y le asigne una fecha especifica al modal como fecha de inicio, eso no lo va a hacer fernando,
        // pero con el evento ya se tienen esos valores
        // console.log(e);
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = (event, start, end, isSelected ) => {
        // console.log({event });
        // si el evento fue creado por la persona que tiene la sesion abierta, se ve el background de un color, sino de otro

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        
        return {
            style
        }
    }
    return (
        <div className="calendar-screen">
            <NavBar/>
            {
                events && 
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent = {onDoubleClick}
                    onSelectEvent={onSelect}
                    onSelectSlot={onSelectFuera}
                    selectable= {true}
                    onView={onViewChange}
                    view={lastView}
                    components={{
                        event: CalendarEvent
                    }}
                    />
            }
            <AgregarNuevoBotonFlotante/>
            {
                eventoActivo && <BotonEliminarEvento/>
            }
            <CalendarModal/>
        </div>
    )
}
