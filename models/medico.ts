
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

let medicoSchema = new Schema( {
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El id hospital es un campo obligatorio'] }
})

export const Medico = mongoose.model("Medico", medicoSchema );