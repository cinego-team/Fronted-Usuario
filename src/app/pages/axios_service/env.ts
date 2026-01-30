export const config = {

    APIPeliculasUrls: {
        baseUrl: '181.16.167.229:3000',
        getPeliculaById: (id: number) => `microservicio-peliculas/pelicula/${id}`,
        getAllPeliculas: 'microservicio-peliculas/peliculas',
    },

    APIUsuariosUrls: {
        baseUrl: '181.16.167.229:3000',
        getDatosClienteById: (id: number) => `microservicio-usuarios/datos-cliente/${id}`,
        refreshToken: 'microservicio-usuarios/refresh-token',
        register: 'microservicio-usuarios/usuario/register',
        login: 'microservicio-usuarios/usuario/login',
        getDatosUsuario: 'microservicio-usuarios/datos-cliente',
    },

    APIFuncionesUrls: {
        baseUrl: '181.16.167.229:3000',

        findAllByPeliculaId: (id: number) =>
            `microservicio-funciones-y-salas/funciones-por-pelicula/${id}`,

        findAllDisponibilidadByFuncionId: (id: number) =>
            `microservicio-funciones-y-salas/butaca-por-funcion/${id}`,

        getFuncionById: (id: number) =>
            `microservicio-funciones-y-salas/funcion/${id}`,
    },
    APIVentasUrls: {
        baseUrl: '181.16.167.229:3000',
        crearVenta: 'microservicio-ventas/abrir-venta',
    }
}