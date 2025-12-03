import { Injectable } from '@angular/core';
import { axiosAPIPeliculas, axiosAPIFunciones}  from './axios.client';
import { config } from './env';

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    constructor() { }

    async getAllPeliculas(page: number): Promise<
        Array<{
            id: number;
            titulo: string;
            director: string;
            duracion: number;
            sinopsis: string;
            poster: string;
            estado: string;
            clasificacion: string;
            genero: string;
        }>
    > {
        const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getAllPeliculas, {
            params: { page }
        })).data;
        const respuesta = datos.map(
            (item: {
                id: any;
                titulo: string;
                director: string;
                duracion: number;
                sinopsis: string;
                poster: string;
                estado: string;
                clasificacion: string;
                genero: string;
            }) => ({
                id: item.id,
                titulo: item.titulo,
                director: item.director,
                duracion: item.duracion,
                sinopsis: item.sinopsis,
                poster: item.poster,
                estado: item.estado,
                clasificacion: item.clasificacion,
                genero: item.genero,
                
            })
        );
        return respuesta;
    }

    async getFuncionesByPeliculaId(id: number): Promise<
        Array<{
            id: number;
            estaDisponible: boolean;
            fecha: Date;
            horarios: { hora: string
            disponible: boolean }[];
            idioma: string;
            sala: {
                nroSala: number;
                capacidad: number;
                estaDisponible: boolean;
            }
            formato: {
                nombre: string;
                precio: number;
            }
            disponibilidadButaca: {
                nroButaca: number
                estadoDisponibilidadButaca: string ;
            }[];
            peliculaId: number; 
        }>
    > {
        const datos = (await axiosAPIFunciones.get(config.APIFuncionesUrls.findAllByPeliculaId(id), {
        })).data;
        const respuesta = datos.map(
            (item: {
                id: number;
                estaDisponible: boolean;
                fecha: Date;
                horarios: { hora: string
            disponible: boolean }[];
                idioma: string;
                sala: {
                    nroSala: number;
                    capacidad: number;
                    estaDisponible: boolean;
                }
                formato: {
                    nombre: string;
                    precio: number;
                }
                disponibilidadButaca: {
                    nroButaca: number
                    estadoDisponibilidadButaca: string ;
                }[];
                peliculaId: number; 
            }) => ({
                id: item.id,
                estaDisponible: item.estaDisponible,
                fecha: item.fecha,
                horarios: item.horarios,
                idioma: item.idioma,
                sala: {
                    nroSala: item.sala.nroSala,
                    capacidad: item.sala.capacidad,
                    estaDisponible: item.sala.estaDisponible,
                },
                formato: {
                    nombre: item.formato.nombre,
                    precio: item.formato.precio,
                },
                disponibilidadButaca: item.disponibilidadButaca.map(butaca => ({   //corregir, no se si esta bien
                    nroButaca: butaca.nroButaca,
                    estadoDisponibilidadButaca: butaca.estadoDisponibilidadButaca,
                })),
                peliculaId: item.peliculaId,
                
            })
        );
        return respuesta;
    }

    async getDisponibilidadesByFuncionId(id: number): Promise<
        Array<{
            id: number;
            funcionId: number;
            butacaId: number;
            estadoDisponibilidadButacaId: string;
        }>
    > {
        const datos = (await axiosAPIFunciones.get(config.APIFuncionesUrls.findAllDisponibilidadByFuncionId(id), {
        })).data;
        const respuesta = datos.map(
            (item: {
                id: number;
                funcionId: number;
                butacaId: number;
                estadoDisponibilidadButacaId: string;
            }) => ({
                id: item.id,
                funcionId: item.funcionId,
                butacaId: item.butacaId,
                estadoDisponibilidadButacaId: item.estadoDisponibilidadButacaId,
                
            })
        );
        return respuesta;
    }
}
