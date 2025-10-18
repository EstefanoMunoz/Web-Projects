
/*
Crea la estructura del error con los parametros: message, status, next y lanza el error para ser recibido
por el errorHandler.
*/

export function createError({ message, status }) {
    
    const err = new Error( message );
    err.status = status;
    return err;  // Retorno el error creado controladamente para que el controlador o middleware lo lanze.

}