const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
});

// para sobre escribir algo del modelo, estos cambios es solo al momento de ver la data, no afecta la base de datos ni nada
// eso es para que al frontend no se vaya el id ni el __v que asigna mongo, le quito propiedades al return
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);