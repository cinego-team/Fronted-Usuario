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
        register: 'microservicio-usuarios/registro',
        login: 'microservicio-usuarios/login',
    },
    APIFuncionesUrls: {
        baseUrl: 'http://localhost:3000',
        findAllByPeliculaId: (id: number) => `microservicio-funciones-y-salas/funciones-por-pelicula/pelicula/${id}`,
        findAllDisponibilidadByFuncionId: (id: number) => `microservicio-funciones-y-salas/butaca-por-funcion/disponibilidad/${id}`
    },
    APIVentasUrls: {
        baseUrl: 'http://localhost:3000',
        crearVenta: 'microservicio-ventas/crear-venta', //cambiar
    }
}