import { Competiciones } from './model/competiciones'
import { Equipos } from './model/equipos'
import { Integrante, Plantillas } from './model/plantillas'
import { Traspasos } from './model/traspasos'
import { FondoEquipo, EquipoPlantilla, TraspasosRealizados } from './model/interfaces'
import { db } from './database/database'
import {Request, Response} from 'express'
import express from 'express'
const app = express()
const port = 3000

const fun1 = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          let arrayIntegrantes: Array<Integrante>
          const query: any = await Plantillas.find(
          {}, {_id:0, id_integrante:1, id_equipo:1, tipo:1, nombre:1, apellido:1, fecha_nacimiento:1, valor:1})

          console.log(query)
          arrayIntegrantes = query
          console.log(arrayIntegrantes)

          let valorTotal: number = 0
          let integrante: Integrante

          for (integrante of arrayIntegrantes){
            console.log(integrante.valor)
            valorTotal += integrante.valor
          }

          res.json("ValorTotal: " + valorTotal )
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }

const fun2 = async (req: Request, res: Response) => {
  const nombre_equipo_entrada : string = req.params.nombre_equipo_entrada
  const id_equipo_entrada : number = parseInt(req.params.id_equipo_entrada)
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          let arrayIntegrantes: Array<Integrante>
          let arrayEquipo: Array<FondoEquipo>
          const query: any = await Plantillas.aggregate([
            {
              $lookup:{
                from: "equipos",
                localField: "id_equipo",
                foreignField: "id_equipo",
                as: "equipo"
              }
            },
            {
              $project:{
                nombre_equipo: "$equipo.nombre_equipo",
                valor: "$valor",
                id_equipo: "$equipo.id_equipo"
              }
            },
            {
              $match:{
                $or:[
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
              $project:{
                _id:0,
                id_integrante:1,
                nombre:1,
                apellido:1,
                id_equipo:1,
                nombre_equipo:1,
                valor:1,
              }
            }
          ])

          console.log(query)
          arrayIntegrantes = query
          arrayEquipo = query
          console.log(arrayIntegrantes)

          let valorTotal: number = 0
          let nombre_del_equipo: string = ""
          let integrante: Integrante
          let equipo: FondoEquipo

          interface respuesta{
            nombre_equipo: string,
            valorEquipo:number
          }
          let resultado: Array<respuesta> = []

          for (integrante of arrayIntegrantes){
            console.log(integrante.valor)
            valorTotal += integrante.valor 
          }     
          for (equipo of arrayEquipo){
            nombre_del_equipo = equipo.nombre_equipo
          }
          console.log(`Sueldo total: ${valorTotal}`)
          resultado.push({
            nombre_equipo: nombre_del_equipo,
            valorEquipo: valorTotal
          })
          res.json(resultado)
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }

const fun3 = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          let arrayTraspasos: Array<TraspasosRealizados>
          const query: any = await Equipos.aggregate([
            {
              $lookup:{
                from: "traspasos",
                localField: "id_equipo",
                foreignField: "id_equipo",
                as: "traspasos"
              }
            },
            {
              $lookup:{
                from:"plantillas",
                localField: "id_equipo",
                foreignField: "id_equipo",
                as: "plantillas"
              }
            },
            {
              $project:{
                id_traspaso: "$traspasos.id_integrante",
                nombre_equipo: "$nombre_equipo",
                nombre_integrante: "$plantillas.nombre",
                id_integrante: "$plantillas.id_integrante"
              }
            },
            {
              $project:{
                _id:0,
                nombre_equipo: 1,
                id_traspaso: 1,
                id_integrante: 1,
                nombre_integrante: 1,
              }
            }
          ])

          console.log(query)
          arrayTraspasos = query
          console.log(arrayTraspasos)

          let traspasos: TraspasosRealizados

          interface respuesta{
            equipo: string,
            integrantesEquipo: number,
            nombreIntegrantesEquipo: string,
            id_traspasos: number
          }
          let resultado: Array<respuesta> = []

          for (traspasos of arrayTraspasos){
            console.log(traspasos.id_traspaso)
            resultado.push({
            equipo: traspasos.nombre_equipo,
            integrantesEquipo: traspasos.id_integrante,
            nombreIntegrantesEquipo: traspasos.nombre_integrante,
            id_traspasos: traspasos.id_traspaso
            })
          }
          console.log(resultado)
          res.json(resultado)
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }
const fun4 = async (req: Request, res: Response) => {
  const funcion : string = req.params.funcion
  const valor : number = parseInt(req.params.valor)
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          const query: any = await Plantillas.aggregate([
            {
              $match:{
                $and:[
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
              $lookup:{
                from: "equipos",
                localField: "id_equipo",
                foreignField: "id_equipo",
                as: "equipos"
              }
            },
            {
              $project:{
                id_integrante: "$id_integrante",
                nombre_integrante: "$nombre",
                id_equipo: "$equipos.id_equipo",
                nombre_equipo: "$equipos.nombre_equipo",
                valor: "$valor",
                fecha_nacimiento: "$fecha_nacimiento",
                funcion:funcion,
                valorFinal:valor
              }
            },
            {
              $project:{
                _id:0,
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
          ])
          
          console.log(query)
          res.json(query)
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }

const fun5 = async (req: Request, res: Response) => {
  const confirmar : string = req.params.rey
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          let arrayRespuesta: Array<respuestasi>
          const query: any = await Equipos.aggregate([
            {
              $lookup:{
                from: "competiciones",
                localField: "id_competicion",
                foreignField: "id_competicion",
                as: "competiciones"
              }
            },
            {
              $project:{
                id_equipo: "$id_equipo",
                nombre_equipo: "$nombre_equipo",
                id_competiciones_participa: "$competiciones.id_competicion",
                participa: "$competiciones.nombre_competicion",
                confirm: "$rey.confirm",
                rey_competicion: "$rey.competicion"
              }
            },
            {
              $project:{
                _id:0,
                id_equipo: 1,
                nombre_equipo: 1,
                id_competiciones_participa: 1,
                participa: 1,
                confirm: 1,
                rey_competicion: 1
                
              }
            }
          ])
          arrayRespuesta = query
          let equipo : respuestasi
          let equipo2 : respuestano

          interface respuestasi{
            nombre_equipo: string,
            confirm: boolean,
            id_competiciones_participa: number,
            participa: string
            rey_competicion: Array<string>
          }
          interface respuestano{
            nombre_equipo: string,
            confirm: boolean,
          }

          let resultado: Array<respuestasi> = []
          let resultadono: Array<respuestano> = []
          let salidaError: string = "ERROR: no se ha introducido correctamente la entrada por teclado."

          for (equipo of arrayRespuesta){
            console.log(equipo.nombre_equipo)
            if(confirmar=="si"){
              if(equipo.confirm){
                resultado.push({
                  nombre_equipo: equipo.nombre_equipo,
                  confirm: equipo.confirm,
                  id_competiciones_participa: equipo.id_competiciones_participa,
                  participa: equipo.participa,
                  rey_competicion: equipo.rey_competicion,
                })
              }
            } else if (confirmar=="no"){
              if(!equipo.confirm){
                resultadono.push({
                  nombre_equipo: equipo.nombre_equipo,
                  confirm: equipo.confirm,
                })
              }
            } 
          }
          if (confirmar=="si"){
              console.log(resultado)
              res.json(resultado)
            } else if (confirmar=="no"){
              console.log(resultadono)
            res.json(resultadono)
          } else {
              console.log(salidaError)
              res.json(salidaError)
          }
          
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }

const inicio = async (req: Request, res: Response) => {
   res.send("BASE DE DATOS FUTBOLÍSTICA DE MIGUEL BORREGUERO SORIA<br><br>Valor de la suma de todo los equipos registrados en la base de datos:<br>/valor_equipos<br><br>Valor del equipo introducido por teclado, sea el nombre o el id: <br>/valor/:nombre_equipo_entrada/:id_equipo_entrada<br><br>Registro de todos los traspasos realizados entre los equipos de la base de datos:<br>/traspasos<br><br>Buscador de jugadores según la función que tenga el integrante del equipo y su valor:<br>/buscador/:funcion/:valor<br><br>Buscador de equipos reyes de competiciones:<br>/competiciones/:rey")
 }

app.get('/', inicio)
app.get('/valor_equipos', fun1)
app.get('/valor/:nombre_equipo_entrada/:id_equipo_entrada', fun2)
app.get('/traspasos', fun3)
app.get('/buscador/:funcion/:valor', fun4)
app.get('/competiciones/:rey', fun5)

app.listen(port, () => {
  console.log(`Listening...`)
})
