import {Schema, model } from 'mongoose'

// Definimos el Schema
const traspasosSchema = new Schema({
    id_integrante: Number,
    id_equipo: Number
})

// La colección de la BD (Plural siempre)
export const Traspasos = model('traspasos', traspasosSchema)