
import { z } from "zod";

const productSchema = z.object({

    title: z.string({
        required_error: "Tittle is required",
        invalid_type_error: "Tittle must be a text"
    }).min(10, {
        message: "Tittle must have least 10 characters"
    }),
    price: z.number().refine(value => !number.isInteger(value), { message: "Must be a float number" }),
    description: z.string({ required_error: "Description is required" }).min(50, { message: "Description must have least 50 characters" }),
    category: z.string(),
    image: z.string().url({ message: "Poster must be a valid URL" }),
    rating: z.object({

        // .refine() permite y sirve para agregar validaciones personalizadas cuando no estan cubiertas por los metodos integrados en z.
        rate: z.number({ required_error: "Rate is required" }).refine(value => !number.isInteger(value), { message: "Must be a float number" }).min.max(10),
        count: z.number({ required_error: "Count is required" }).int().positive(),
    
    })

});