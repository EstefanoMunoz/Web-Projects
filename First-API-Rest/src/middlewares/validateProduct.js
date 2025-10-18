
import productSchema from "../schemas/schema.product.js";
import { createError } from "../Utils/createError.js";

export function validateProduct(req, res, next) {
    // Sirve tanto para actualizar para validar un objeto js con todos los parametros o con parametros opcionales ingresados.x

    const result = productSchema.partial().safeParse(req.body); // Le pasamos el body de la petición para verificar si cumple con el schema de producto.
    if (!result.success) {
        const err = createError({
            message: JSON.stringify(result.error.format(), null, 2),
            status: 400
        }); 
        /*
            Con "result.error.format()" mostraria los errores encontrados en cada parametro:
                {
                    title: { _errors: ["Tittle must have least 10 characters"] },
                    price: { _errors: ["Must be a float number"] },
                    description: { _errors: ["Description must have least 50 characters"] },
                    image: { _errors: ["Poster must be a valid URL"] },
                    rating: {
                        rate: { _errors: ["Number must be less than or equal to 10"] },
                        count: { _errors: ["Number must be greater than 0"] }
                    }
                }

        */
        return next(err);   // Lanzo el error para que el errorHandler lo reciba y lo trate.
    }

    req.validatedData = result.data;    // Le agrego una nueva propiedad al "req" donde guardar los datos validados.
    return next(); // Si todo va bien, pasa al siguiente callback de la pila de callbacks del mini-servidor (En el router, porque ahi lo estoy colocando).
}