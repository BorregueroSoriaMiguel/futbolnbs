import {Schema, model } from 'mongoose'

// Definimos el Schema
const competicionesSchema = new Schema({
    id_competicion: Number,
    nombre_competicion: String
})

// La colección de la BD (Plural siempre)
export const Competiciones = model('competiciones', competicionesSchema)