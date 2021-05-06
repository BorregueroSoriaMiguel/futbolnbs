import {Schema, model } from 'mongoose'

// Definimos el Schema
const plantillasSchema = new Schema({
    id_integrante: Number,
    id_equipo: Number,
    tipo: String,
    nombre: String,
    apellido: String,
    fecha_nacimiento: Date,
    valor: Number
})

export interface Integrante{
  id_integrante: number,
    id_equipo: number,
    tipo: string,
    nombre: string,
    apellido: string,
    fecha_nacimiento: Date,
    valor: number
}

// La colección de la BD (Plural siempre)
export const Plantillas = model('plantillas', plantillasSchema)