export interface FondoEquipo{
  id_equipo: number,
  nombre_equipo: string,
  valorTotal: number
}

export interface EquipoPlantilla{
  id_equipo: number,
  nombre_equipo: string,
  id_integrante: number,
  nombre_integrante: string,
  fecha_nacimiento: Date,
  valor: number
}

export interface TraspasosRealizados{
  id_equipo: number,
  nombre_equipo: string,
  id_traspaso: number,
  nombre_integrante: string,
  id_integrante: number
}