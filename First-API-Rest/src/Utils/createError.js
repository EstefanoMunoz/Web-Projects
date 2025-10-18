
/*
Crea la estructura del error con los parametros: message, status, next y lanza el error para ser recibido
por el errorHandler.
*/

export function createError({ message, status, next }) {
    
    const err = new Error( message );
    
    err.status = status;
    next(err);  // Lanzo el error para que el errorHandler lo reciba y lo trate.

}