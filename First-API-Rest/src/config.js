/**
 * config.js se encarga de ser la configuración general (puerto, entorno, etc.)
*/

export const { 

    PORT = 3000,
    DATA_SOURCE = "./src/db/products.json",     // Ruta  relativa del modelo de "base de datos" desde donde ejecuto el "node".

} = process.env;