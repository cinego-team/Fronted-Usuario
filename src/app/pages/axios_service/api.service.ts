import { Injectable } from '@angular/core';
import { axiosAPIPeliculas, axiosAPIFunciones, axiosAPIVentas } from './axios.client';
import { config } from './env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getAllPeliculas(): Promise<
    {
      id: number;
      titulo: string;
      director: string;
      duracion: number;
      fechaEstreno: string;
      sinopsis: string;
      urlImagen: string;
      genero: string;
      clasificacion: string;
    }[]
  > {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getAllPeliculas)).data;
    const respuesta = datos.map(
      (item: {
        id: number;
        titulo: string;
        director: string;
        duracion: number;
        fechaEstreno: string;
        sinopsis: string;
        urlImagen: string;
        genero: string;
        clasificacion: string;
      }) => ({
        id: item.id,
        titulo: item.titulo,
        director: item.director,
        duracion: item.duracion,
        fechaEstreno: item.fechaEstreno,
        sinopsis: item.sinopsis,
        urlImagen: item.urlImagen,
        genero: item.genero,
        clasificacion: item.clasificacion,
      }),
    );
    return respuesta;
  }

  async getFuncionesByPeliculaId(id: number): Promise<
    {
      id: number;
      estaDisponible: boolean;
      fecha: Date;
      hora: string;
      idioma: {
        id: number;
        nombre: string;
      };
      sala: {
        id: number;
        nroSala: number;
      };
      formato: {
        id: number;
        nombre: string;
        precio: number;
      };
    }[]
  > {
    const datos = (await axiosAPIFunciones.get(config.APIFuncionesUrls.findAllByPeliculaId(id)))
      .data;

    const respuesta = datos.map((item: any) => ({
      id: item.id,
      estaDisponible: item.estaDisponible,
      fecha: new Date(item.fecha),
      hora: item.hora,

      idioma: item.idioma
        ? {
            id: item.idioma.id,
            nombre: item.idioma.nombre,
          }
        : null,

      sala: {
        id: item.sala.id,
        nroSala: item.sala.nroSala,
      },

      formato: {
        id: item.formato.id,
        nombre: item.formato.nombre,
        precio: item.formato.precio,
      },
    }));

    return respuesta;
  }

  async getFuncionById(id: number): Promise<{
    id: number;
    estaDisponible: boolean;
    fecha: string; // llega como string en JSON
    peliculaId: number;
    sala: {
      id: number;
      nro_sala: number;
    };
    formato: {
      id: number;
      nombre: string;
      precio: number;
    };
  }> {
    const funcion = (await axiosAPIFunciones.get(config.APIFuncionesUrls.getFuncionById(id))).data;
    return funcion;
  }

  async getPeliculaById(id: number): Promise<{
    id: number;
    titulo: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    sinopsis: string;
    url: string;
    empleadoResponsable: number;
    idioma: string;
    genero: string;
    clasificacion: string;
    estado: string;
  }> {
    const pelicula = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getPeliculaById(id)))
      .data;
    return pelicula;
  }

  async getDisponibilidadByFuncionId(id: number): Promise<
    {
      id: number;
      butaca: {
        nroButaca: number;
        fila: {
          letraFila: string;
        };
      };
      estadoDisponibilidadButaca: {
        nombre: string;
      };
    }[]
  > {
    const disponibilidades = (
      await axiosAPIFunciones.get(config.APIFuncionesUrls.findAllDisponibilidadByFuncionId(id))
    ).data;
    return disponibilidades;
  }

  async crearVenta(payload: { funcionId: number; disponibilidadButacaIds: number[] }) {
    console.log('URL FINAL:', config.APIVentasUrls.baseUrl + '/microservicio-ventas/abrir-venta');

    const response = await axiosAPIVentas.post('microservicio-ventas/abrir-venta', payload);

    return response.data;
  }
}
