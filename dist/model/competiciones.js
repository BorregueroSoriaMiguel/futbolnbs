"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competiciones = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const competicionesSchema = new mongoose_1.Schema({
    id_competicion: Number,
    nombre_competicion: String
});
// La colección de la BD (Plural siempre)
exports.Competiciones = mongoose_1.model('competiciones', competicionesSchema);
