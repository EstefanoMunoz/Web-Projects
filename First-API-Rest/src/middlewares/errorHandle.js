/*
Este fat arrow function funcionara como un middleware para atrapar los errores que salgan de cualquier parte del codigo principal con
next(err), que deben ser tratados y enviados desde:
    - models
    - controller
    - router
    - schemas
*/

export const errorHandler = (err, req, res, next) => {
    
    const status = err.status || 500; // Por defecto 500 si el desarrollador no definio el status antes de enviar el error con next()
    res.status(status).json({ message: err.message || "Fatal Internal server error"});
    
    console.error(err); // Para el debugging, o mejor dicho, para notificar en la consola al desarrollador.

};