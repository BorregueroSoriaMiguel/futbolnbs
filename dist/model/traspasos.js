"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traspasos = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const traspasosSchema = new mongoose_1.Schema({
    id_integrante: Number,
    id_equipo: Number
});
// La colección de la BD (Plural siempre)
exports.Traspasos = mongoose_1.model('traspasos', traspasosSchema);
