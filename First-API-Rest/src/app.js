/**
 * app.js se encarga de configurar Express (middlewares, rutas, etc.)
*/

import express from "express";
import { CreateProductsRoutes } from "./routes/routes.products.js";
import { errorHandler } from "./middlewares/errorhandle.js";

export const createAPIRest = ({ ProductModelType }) => {

    const app = express();      // Creo el servidor con express (app lo sera)

    app.use(express.json());    // Le sigo al servidor como debe ser capas de leer los cuerpos JSON en las peticiones CRUD.

    // Aqui se manejaran las rutas generales del servidor. Por ahora, solo "/products" (el padre)
    app.use("/products", CreateProductsRoutes({ ProductModelType })); // Cuando se haga un resquest en la ruta padre "/products", se cargaran todas las sub-rutas que manejan los requests.

    // Le decimos a express quien tiene que recibir y tratar con los errores
    app.use(errorHandler);  // El errorHandler siempre debe ir al final.

    return app;
};