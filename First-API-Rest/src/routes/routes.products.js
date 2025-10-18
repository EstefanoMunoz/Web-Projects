/**
 * Routes - (Capa superior a controllers)
 * - En "Routes" se programa el comó el sistema debe direccionar hacia el comó se respondera a la petición.
 * - Aqui es donde se programa el CRUD (get, post, patch, delete | Endpoints) de peticiones solicitadas desde el frontend, y que son recibidas aquí.
*/

import { Router } from "express";
import { ProductController } from "../controllers/controller.products.js"
import { validateProduct } from "../middlewares/validateProduct.js";

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
    
    // Express, internamente inyecta automaticamente los parametros (objetos) req y res (y opcionlamente next) al ejecutar getAll.
    router.get("/", controller.getAll);       // Este get es para obtener todos los datos.
    router.get("/:id", controller.getById);   // Este get es para obtener un solo dato segun su id
    router.patch("/:id", validateProduct, controller.update);  // Este patch es para actualizar parcialmente un producto segun su id, pero para eso, en la petición debe enviar los parametros a actualizar. (el id no se cambia, y el cuerpo de body debe tener un header especificando que es de tipo json)
    router.put("/:id", validateProduct, controller.update);    // Este put es para actualizar por completo un producto segun su id, pero para eso, en la petición debe enviar todos los parametros a reemplazar. (el id tambien se cambia)
    router.post("/", validateProduct, controller.create);      // Este post es para crear un nuevo producto.
    router.delete("/:id", controller.delete); // Este delete es para eliminar un producto.

    return router;

}