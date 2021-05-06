"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plantillas = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const plantillasSchema = new mongoose_1.Schema({
    id_integrante: Number,
    id_equipo: Number,
    tipo: String,
    nombre: String,
    apellido: String,
    fecha_nacimiento: Date,
    valor: Number
});
// La colección de la BD (Plural siempre)
exports.Plantillas = mongoose_1.model('plantillas', plantillasSchema);
