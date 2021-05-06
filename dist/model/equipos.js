"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipos = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const equiposSchema = new mongoose_1.Schema({
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
});
// La colección de la BD (Plural siempre)
exports.Equipos = mongoose_1.model('equipos', equiposSchema);
