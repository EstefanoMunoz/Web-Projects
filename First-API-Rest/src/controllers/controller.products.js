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

    // Este metodo sera capas de retornar todos los productos, o retornar todos los productos pero filtrandolos segun los parametros recibidos.
    getAll = async (req, res, next) => {     // Este metodo es un "fat array function" en vez de una "function" para heredar el "this" de la clase, y no del "this" que crea el "function", y async para no bloquear el flujo y retornar una Promise.
        
        let products;
        try {
            products = await this.ProductModelType.getAll();   // Uso await para que "products" espere el resultado que retorne .getAll(). (Aqui products es un "objeto js")
            
        } catch (err) {
            return next(err); // Lanzo el error con este catch con contexto: req, res, next para que lo reciba el errorHandler
        }
        
        const { title, price, category, rate } = req.query;    // Importante, aqui uso .query y no .params.
        let productsFiltered = [...products];   // Hacemos una copia de los productos.

        // Filtramos los productos segun se active acada if (se activa si existe contenido en el parametro o no).
        if (title) productsFiltered = productsFiltered.filter( p => toLowerCase(p.title) === toLowerCase(title) );
        if (price) productsFiltered = productsFiltered.filter( p => p.price === Number(price) );
        if (category) productsFiltered = productsFiltered.filter( p => toLowerCase(p.category) === toLowerCase(category) );
        if (rate) productsFiltered = productsFiltered.filter( p => (p.rating.rate) === Number(rate) );

        // Hago una serialización, es decir, convierto "productos" de un objeto a un string json (con .json()) y lo envio como respuesta HTTP.
        res.json(productsFiltered);   // Si no hay parametros de filtrado, se enviaan todos los productos, en caso contrario, se envian los productos filtrados.
    }

    getById = async (req, res, next) => {
        
        let product;
        const { id } = req.params;  // Asi recupero el ":id" que se suma en la url.
        
        try {
            product = await this.ProductModelType.getById({ id });    // Nada mas se encargaria de mandarle la id recuperada anteriormente, y recibi el producto; y no de saber el proceso para buscar el producto (buena practica).
            
        } catch (err) {
            return next(err); // Lanzo el error con este catch con contexto: req, res, next para que lo reciba el errorHandler.
        }
        
        res.json(product);  // Envio el producto en formato json como una response HTTP.
    }

    update = async (req, res, next) => {  // Este es para el patch y/o put.
        
        let product;
        const { id } = req.params;
        const input = req.validatedData;     // Recupero el cuerpo del json que se envio en el body de la request, pero, ya validado por un middleware.
        
        try {
            product = await this.ProductModelType.update({ id: id, input: input });
            
        } catch (err) {
            return next(err); // Lanzo el error con este catch con contexto: req, res, next para que lo reciba el errorHandler.
        }
        
        res.json(product);
    }

    create = async (req, res, next) => {
        
        let product;
        const input = req.validatedData;

        try {
            product = await this.ProductModelType.create({ input });
            
        } catch (err) {
            return next(err); // Lanzo el error con este catch con contexto: req, res, next para que lo reciba el errorHandler.
        }
        
        res.json(product);
    }

    delete = async (req, res, next) => {
        
        let product;
        const { id } = req.params;

        try {
            product = await this.ProductModelType.delete({ id });
            
        } catch (err) {
            return next(err); // Lanzo el error con este catch con contexto: req, res, next para que lo reciba el errorHandler.
        }
        
        res.json(product);
    }

}