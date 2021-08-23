import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import './modal.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
Modal.setAppElement('#root');
const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
    title:'',
    notes:'',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {
    const { modalOpen } = useSelector( state => state.ui );
    const { eventoActivo } = useSelector( state => state.calendar );
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [tituloValido, setTituloValido] = useState(true);
    const dispatch = useDispatch();
    const [form, setFormValues] = useState(initEvent);

    const  handleInputChange = ({target}) => {
        setFormValues({
            ...form,
            [target.name]: target.value
        });
    };

    const {notes, title, start, end} =  form;

    useEffect(() => {
        if (eventoActivo) {
            setFormValues(eventoActivo);
        }
    }, [eventoActivo, setFormValues])

    const closeModal = () => {
        // todo cerrar el modal
        dispatch( uiCloseModal() );
        // la siguiente liena es para borrar del state el valor de la nota activa, ya que el usuario cerro el modal
        dispatch(eventClearActiveEvent());
        setFormValues( initEvent );
    }
    const cambioFechaInicio = (e) => {
        setDateStart(e);
        setFormValues({
            ...form,
            start: e
        });
    }
    const cambioFechaFin = (e) => {
        // const date = (e.timeStamp) ? Date(e.timeStamp) : null;
        setDateEnd(e);
        setFormValues({
            ...form,
            // end: date,
            end: e,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const momentStart = moment( start );
        const momentEnd = moment( end );
        /**
         * si la fecha de inicio es igual o esta despues de la fecha fin, yo no debo dejarla pasar
         * la fecha mayor debe ser mayor a fecha start
         */
        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
            return
        }
        // validacion para la caja de texto
        if(title.trim().length < 2) {
            return setTituloValido(false);
        }

        // verificamos si se esta agregando o editando, si hay evento activo estamos editando, si no existe, estamos creando
        if (eventoActivo) {
            dispatch(eventStartUpdate(form));
        } else {
            dispatch(eventStartAddNew(form));
        }
        
        setTituloValido(true);
        closeModal();
    }

    return (
        <Modal
          isOpen={modalOpen}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={cambioFechaInicio}
                        value={dateStart}
                        
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={cambioFechaFin}
                        value={dateEnd}
                        minDate = {dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text"
                        className={ `form-control ${ !tituloValido && 'is-invalid' } `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                    onClick={handleSubmit}
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
