export const config = {

    APIPeliculasUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        getPeliculaById: (id: number) => `microservicio-peliculas/pelicula/${id}`,
        getAllPeliculas: 'microservicio-peliculas/peliculas',
    },

    APIUsuariosUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        getDatosClienteById: (id: number) => `microservicio-usuarios/datos-cliente/${id}`,
        refreshToken: 'microservicio-usuarios/refresh-token',
        register: 'microservicio-usuarios/usuario/register',
        login: 'microservicio-usuarios/usuario/login',
        getDatosUsuario: 'microservicio-usuarios/datos-cliente',
    },

    APIFuncionesUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',

        findAllByPeliculaId: (id: number) =>
            `microservicio-funciones-y-salas/funciones-por-pelicula/${id}`,

        findAllDisponibilidadByFuncionId: (id: number) =>
            `microservicio-funciones-y-salas/butaca-por-funcion/${id}`,

        getFuncionById: (id: number) =>
            `microservicio-funciones-y-salas/funcion/${id}`,
    },
    APIVentasUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        crearVenta: 'microservicio-ventas/abrir-venta',
    }
}