export const config = {

    APIPeliculasUrls: {
        baseUrl: 'https://api-gateway-one-rose.vercel.app',
        getPeliculaById: (id: number) => `microservicio-peliculas/pelicula/${id}`,
        getAllPeliculas: 'microservicio-peliculas/peliculas',
    },

    APIUsuariosUrls: {
        baseUrl: 'https://api-gateway-one-rose.vercel.app',
        getDatosClienteById: (id: number) => `microservicio-usuarios/datos-cliente/${id}`,
        refreshToken: 'microservicio-usuarios/refresh-token',
        register: 'microservicio-usuarios/usuario/register',
        login: 'microservicio-usuarios/usuario/login',
        getDatosUsuario: 'microservicio-usuarios/datos-cliente',
    },

    APIFuncionesUrls: {
        baseUrl: 'https://api-gateway-one-rose.vercel.app',

        findAllByPeliculaId: (id: number) =>
            `microservicio-funciones-y-salas/funciones-por-pelicula/${id}`,

        findAllDisponibilidadByFuncionId: (id: number) =>
            `microservicio-funciones-y-salas/butaca-por-funcion/${id}`,

        getFuncionById: (id: number) =>
            `microservicio-funciones-y-salas/funcion/${id}`,
    },
    APIVentasUrls: {
        baseUrl: 'https://api-gateway-one-rose.vercel.app',
        crearVenta: 'microservicio-ventas/abrir-venta',
    }
}