
import { productSchema } from "../schemas/schema.product";
import { createError } from "../Utils/createError";

export function validateProduct(req, res, next) {

    const result = productSchema.Partial().safeParse()
    if (!result.success) {
        createError({ message: result.error.format(), status: 400, next }); 
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
        return;
    }

    return result;
}