export const config = {
  APIPeliculasUrls: {
    baseUrl: 'http://localhost:3000',
    getPeliculaById: (id: number) => `microservicio-peliculas/pelicula/${id}`,
    getAllPeliculas: 'microservicio-peliculas/peliculas',
  },

  APIUsuariosUrls: {
    baseUrl: 'http://localhost:3000',
    getDatosClienteById: (id: number) => `microservicio-usuarios/datos-cliente/${id}`,
    refreshToken: 'microservicio-usuarios/refresh-token',
    register: 'microservicio-usuarios/usuario/register',
    login: 'microservicio-usuarios/usuario/login',
    getDatosUsuario: 'microservicio-usuarios/datos-cliente',
  },

  APIFuncionesUrls: {
    baseUrl: 'http://localhost:3000',

    findAllByPeliculaId: (id: number) =>
      `microservicio-funciones-y-salas/funciones-por-pelicula/${id}`,

    findAllDisponibilidadByFuncionId: (id: number) =>
      `microservicio-funciones-y-salas/butaca-por-funcion/${id}`,

    getFuncionById: (id: number) => `microservicio-funciones-y-salas/funcion/${id}`,
  },
  APIVentasUrls: {
    baseUrl: 'http://localhost:3000',
    crearVenta: 'microservicio-ventas/abrir-venta',
  },
  APIPromocionesUrls: {
    baseUrl: 'http://localhost:3000',
    getPromocionByUserId: (userId: number) =>
      `microservicio-promociones/promocion/usuario/${userId}`,
  },
};
