export const config = {

    APIPeliculasUrls: {
        baseUrl: 'https://microservicio-de-peliculas.vercel.app',
        getPeliculaById: (id: number) => `microservicio-peliculas/pelicula/${id}`,
        getAllPeliculas: 'microservicio-peliculas/peliculas',
    },

    APIUsuariosUrls: {
        baseUrl: 'https://servicio-usuarios.vercel.app',
        getDatosClienteById: (id: number) => `microservicio-usuarios/datos-cliente/${id}`,
        refreshToken: 'microservicio-usuarios/refresh-token',
        register: 'microservicio-usuarios/usuario/register',
        login: 'microservicio-usuarios/usuario/login',
        getDatosUsuario: 'microservicio-usuarios/datos-cliente',
    },

    APIFuncionesUrls: {
        baseUrl: 'https://servicio-funciones-y-salas.vercel.app',

        findAllByPeliculaId: (id: number) =>
            `microservicio-funciones-y-salas/funciones-por-pelicula/${id}`,

        findAllDisponibilidadByFuncionId: (id: number) =>
            `microservicio-funciones-y-salas/butaca-por-funcion/${id}`,

        getFuncionById: (id: number) =>
            `microservicio-funciones-y-salas/funcion/${id}`,
    },
    APIVentasUrls: {
        baseUrl: 'https://servicio-ventas.vercel.app',
        crearVenta: 'microservicio-ventas/abrir-venta',
    }
}