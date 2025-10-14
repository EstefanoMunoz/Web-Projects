/**
 * server.js se encarga de arrancar el servidor ( app.listen() )
*/

import { PORT } from "./config.js";  // Hago un destructuring del fichero config.js.
import { createAPIRest } from "./app.js";
import { ProductModel } from "./models/local-file-system/model.products.js";

const app = createAPIRest({ ProductModelType: ProductModel });  // Asigno que el tipo de modelo de base de datos (ProductModelType) es ProductModel ().

// Le digo al servidor por cual puerto debe escuchar las peticiones.
app.listen(PORT, () => {
    console.log(`Server listening Port: ${PORT}\nDomain: http://localhost:${PORT}`);
});