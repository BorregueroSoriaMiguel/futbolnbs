import {Schema, model } from 'mongoose'

// Definimos el Schema
const equiposSchema = new Schema({
    id_equipo: Number,
    id_competiciones: Array,
    nombre_equipo: String,
    fecha_fundado: Date,
    palmares: [{
      UEFA: Number,
      LaLigaSantander: Number,
      LaLigaSmartBank: Number,
      Champions: Number
    }],
    rey: [{
      confirm: Boolean,
      competicion: Array
    }]
})

// La colección de la BD (Plural siempre)
export const Equipos = model('equipos', equiposSchema)