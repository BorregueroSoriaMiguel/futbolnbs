"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const equipos_1 = require("./model/equipos");
const plantillas_1 = require("./model/plantillas");
const database_1 = require("./database/database");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const fun1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let arrayIntegrantes;
        const query = yield plantillas_1.Plantillas.find({}, { _id: 0, id_integrante: 1, id_equipo: 1, tipo: 1, nombre: 1, apellido: 1, fecha_nacimiento: 1, valor: 1 });
        console.log(query);
        arrayIntegrantes = query;
        console.log(arrayIntegrantes);
        let valorTotal = 0;
        let integrante;
        for (integrante of arrayIntegrantes) {
            console.log(integrante.valor);
            valorTotal += integrante.valor;
        }
        res.json("ValorTotal: " + valorTotal);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre_equipo_entrada = req.params.nombre_equipo_entrada;
    const id_equipo_entrada = parseInt(req.params.id_equipo_entrada);
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        let arrayIntegrantes;
        let arrayEquipo;
        const query = yield plantillas_1.Plantillas.aggregate([
            {
                $lookup: {
                    from: "equipos",
                    localField: "id_equipo",
                    foreignField: "id_equipo",
                    as: "equipo"
                }
            },
            {
                $project: {
                    nombre_equipo: "$equipo.nombre_equipo",
                    valor: "$valor",
                    id_equipo: "$equipo.id_equipo"
                }
            },
            {
                $match: {
                    $or: [
                        {
                            "nombre_equipo": nombre_equipo_entrada
                        },
                        {
                            "id_equipo": id_equipo_entrada
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    id_integrante: 1,
                    nombre: 1,
                    apellido: 1,
                    id_equipo: 1,
                    nombre_equipo: 1,
                    valor: 1,
                }
            }
        ]);
        console.log(query);
        arrayIntegrantes = query;
        arrayEquipo = query;
        console.log(arrayIntegrantes);
        let valorTotal = 0;
        let nombre_del_equipo = "";
        let integrante;
        let equipo;
        let resultado = [];
        for (integrante of arrayIntegrantes) {
            console.log(integrante.valor);
            valorTotal += integrante.valor;
        }
        for (equipo of arrayEquipo) {
            nombre_del_equipo = equipo.nombre_equipo;
        }
        console.log(`Sueldo total: ${valorTotal}`);
        resultado.push({
            nombre_equipo: nombre_del_equipo,
            valorEquipo: valorTotal
        });
        res.json(resultado);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        let arrayTraspasos;
        const query = yield equipos_1.Equipos.aggregate([
            {
                $lookup: {
                    from: "traspasos",
                    localField: "id_equipo",
                    foreignField: "id_equipo",
                    as: "traspasos"
                }
            },
            {
                $lookup: {
                    from: "plantillas",
                    localField: "id_equipo",
                    foreignField: "id_equipo",
                    as: "plantillas"
                }
            },
            {
                $project: {
                    id_traspaso: "$traspasos.id_integrante",
                    nombre_equipo: "$nombre_equipo",
                    nombre_integrante: "$plantillas.nombre",
                    id_integrante: "$plantillas.id_integrante"
                }
            },
            {
                $project: {
                    _id: 0,
                    nombre_equipo: 1,
                    id_traspaso: 1,
                    id_integrante: 1,
                    nombre_integrante: 1,
                }
            }
        ]);
        console.log(query);
        arrayTraspasos = query;
        console.log(arrayTraspasos);
        let traspasos;
        let resultado = [];
        for (traspasos of arrayTraspasos) {
            console.log(traspasos.id_traspaso);
            resultado.push({
                equipo: traspasos.nombre_equipo,
                integrantesEquipo: traspasos.id_integrante,
                nombreIntegrantesEquipo: traspasos.nombre_integrante,
                id_traspasos: traspasos.id_traspaso
            });
        }
        console.log(resultado);
        res.json(resultado);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const funcion = req.params.funcion;
    const valor = parseInt(req.params.valor);
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        const query = yield plantillas_1.Plantillas.aggregate([
            {
                $match: {
                    $and: [
                        {
                            "tipo": funcion,
                        },
                        {
                            "valor": valor
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "equipos",
                    localField: "id_equipo",
                    foreignField: "id_equipo",
                    as: "equipos"
                }
            },
            {
                $project: {
                    id_integrante: "$id_integrante",
                    nombre_integrante: "$nombre",
                    id_equipo: "$equipos.id_equipo",
                    nombre_equipo: "$equipos.nombre_equipo",
                    valor: "$valor",
                    fecha_nacimiento: "$fecha_nacimiento",
                    funcion: funcion,
                    valorFinal: valor
                }
            },
            {
                $project: {
                    _id: 0,
                    id_integrante: 1,
                    nombre_integrante: 1,
                    id_traspaso: 1,
                    nombre_equipo: 1,
                    valor: 1,
                    fecha_nacimiento: 1,
                    funcion: 1,
                    valorFinal: 1
                }
            }
        ]);
        console.log(query);
        res.json(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const fun5 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmar = req.params.rey;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        let arrayRespuesta;
        const query = yield equipos_1.Equipos.aggregate([
            {
                $lookup: {
                    from: "competiciones",
                    localField: "id_competicion",
                    foreignField: "id_competicion",
                    as: "competiciones"
                }
            },
            {
                $project: {
                    id_equipo: "$id_equipo",
                    nombre_equipo: "$nombre_equipo",
                    id_competiciones_participa: "$competiciones.id_competicion",
                    participa: "$competiciones.nombre_competicion",
                    confirm: "$rey.confirm",
                    rey_competicion: "$rey.competicion"
                }
            },
            {
                $project: {
                    _id: 0,
                    id_equipo: 1,
                    nombre_equipo: 1,
                    id_competiciones_participa: 1,
                    participa: 1,
                    confirm: 1,
                    rey_competicion: 1
                }
            }
        ]);
        arrayRespuesta = query;
        let equipo;
        let equipo2;
        let resultado = [];
        let resultadono = [];
        let salidaError = "ERROR: no se ha introducido correctamente la entrada por teclado.";
        for (equipo of arrayRespuesta) {
            console.log(equipo.nombre_equipo);
            if (confirmar == "si") {
                if (equipo.confirm) {
                    resultado.push({
                        nombre_equipo: equipo.nombre_equipo,
                        confirm: equipo.confirm,
                        id_competiciones_participa: equipo.id_competiciones_participa,
                        participa: equipo.participa,
                        rey_competicion: equipo.rey_competicion,
                    });
                }
            }
            else if (confirmar == "no") {
                if (!equipo.confirm) {
                    resultadono.push({
                        nombre_equipo: equipo.nombre_equipo,
                        confirm: equipo.confirm,
                    });
                }
            }
        }
        if (confirmar == "si") {
            console.log(resultado);
            res.json(resultado);
        }
        else if (confirmar == "no") {
            console.log(resultadono);
            res.json(resultadono);
        }
        else {
            console.log(salidaError);
            res.json(salidaError);
        }
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
const inicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("BASE DE DATOS FUTBOLÍSTICA DE MIGUEL BORREGUERO SORIA<br><br>Valor de la suma de todo los equipos registrados en la base de datos:<br>/valor_equipos<br><br>Valor del equipo introducido por teclado, sea el nombre o el id: <br>/valor/:nombre_equipo_entrada/:id_equipo_entrada<br><br>Registro de todos los traspasos realizados entre los equipos de la base de datos:<br>/traspasos<br><br>Buscador de jugadores según la función que tenga el integrante del equipo y su valor:<br>/buscador/:funcion/:valor<br><br>Buscador de equipos reyes de competiciones:<br>/competiciones/:rey");
});
app.get('/', inicio);
app.get('/valor_equipos', fun1);
app.get('/valor/:nombre_equipo_entrada/:id_equipo_entrada', fun2);
app.get('/traspasos', fun3);
app.get('/buscador/:funcion/:valor', fun4);
app.get('/competiciones/:rey', fun5);
app.listen(port, () => {
    console.log(`Listening...`);
});
