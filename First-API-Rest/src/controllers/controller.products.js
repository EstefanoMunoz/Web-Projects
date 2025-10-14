/**
 * Controllers - Logica de negocio (Capa superior a Models)
 * - En "controllers" se programa el comó responde la API a cada petición.
 * - Aqui es donde se programa el CRUD (previo al real) solicitadas desde Routes, y que son recibidas aqui.
*/

//import ProductModel from "../models/local-file-system/model.products.js";

export class ProductController {

    /* Este constructor recibe el tipo de modelo (el que lee la base de datos), para realizar las respuestas a las peticiones. Ademas
    asi hacemos versatil el codigo ya quen o dependera de la linea 7, el cual era un modelo estatico*/
    constructor ({ ProductModelType }) {
        this.ProductModelType = ProductModelType;   // Es necesario usar el "this." para decir que se use ese atributo de instancia de la clase.
    }

    getAll = async (req, res) => {     // Este metodo es un "fat array function" en vez de una "function" para heredar el "this" de la clase, y no del "this" que crea el "function", y async para no bloquear el flujo y retornar una Promise.
        const products = await this.ProductModelType.getAll();   // Uso await para que "products" espere el resultado que retorne .getAll(). (Aqui products es un "objeto js")
        res.json(products);     // Hago una serialización, es decir, convierto "productos" de un objeto a un string json (con .json()) y lo envio como respuesta HTTP.
    }

}