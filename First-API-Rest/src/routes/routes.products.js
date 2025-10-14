/**
 * Routes - (Capa superior a controllers)
 * - En "Routes" se programa el comó el sistema debe direccionar hacia el comó se respondera a la petición.
 * - Aqui es donde se programa el CRUD (get, post, patch, delete) de peticiones solicitadas desde el frontend, y que son recibidas aquí.
*/

import { Router } from "express";
import { ProductController } from "../controllers/controller.products.js"

export const CreateProductsRoutes = ({ ProductModelType }) => {

    const router = Router();    // Creo un mini/sub-servidor dentro del servidor de express para obtener los .get(), .put(), .post(), .patch(), .delete()
    /*
    Ese router tiene las mismas capacidades básicas que app, es decir, que el servidor principal "express"
    pero solo se usa para definir y agrupar rutas específicas.

    Por eso, router también tiene métodos como .get(), .post(), .put(), .patch(), .delete(), etc.
    */

    const controller = new ProductController({ ProductModelType }); /* ProductoController es quien maneja/tiene los metodos para realizar acciones de donde se traen los datos. */
    /* Aqui se manejaran las rutas concretas del servidor. Es decir, del padre "/products" se manerajan:
    -> "/"
    -> "/:id"
    -> etc.

    Nota: Lo ideal es primero crear los "models" para acceder a los metodos para acceder y/o modificar los
    datos.
    */

    /* Nota, aqui paso al router la referencia de cada fat arrow function para que el diga: perfecto, cuando alguien haga GET a /, yo llamare a esa función por tí.
    En cambio, si pongo, por ejemplo, controller.getAll(), haria que al crearse el sub-servidor "router", se ejecute inmediatamente el .getAll(), no cuando llegue
    petición. Entonces, significa que controller.getAll es un callback porque le pase la referencia para que el lo use cuando guste.  */
    router.get("/", controller.getAll); // Express, internamente inyecta automaticamente los parametros (objetos) req y res (y opcionlamente next) al ejecutar getAll.

    return router;

}