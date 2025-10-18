/**
 * Models - Logica de datos (Capa inferior a controllers)
 * - En "models" se programa el comó el sistema accede o recupera la información.
 * - Aqui es donde se programa el CRUD real: leer, escribir, actualizar, eliminar.
*/

import { DATA_SOURCE } from "../../config.js";  // Importo la constnate DATA_SOURCE desde config.js (exportación con nombre)
import { readJSON } from "../../Utils/readJSON.js";
export class ProductModel {
    
/* Todos los métodos de esta clase son utilidades relacionadas con productos, y no requieren mantener un estado interno.
Por eso se definen como métodos estáticos: así se pueden invocar directamente desde la clase sin crear una instancia.
Esto hace el código más simple, eficiente y fácil de mantener. */

    static async getAll() {    // Nota: Como no necesito instanciar la clase ni usar "this", no hace falta un constructor. Tampoco requiere fat arrow functions, ya que no hay contexto interno que mantener (generar un this para referirme a un atributo).
        
        let products;
        try {
            // Lógica para obtener todos los productos
            products = await readJSON(DATA_SOURCE);     // Leemos todos los productos desde el archivo JSON

        } catch (err) {
            throw err;  // Lanzo el error para que lo reciba el un catch mas arriba con contexto: req, res, next.
        }
        
        return products;    // Envio el "objeto js" si no sucede ningun error.
    }
    static async getById({ id }) {
        
        let products;
        try {
            // Lógica para obtener un producto por ID
            products = await readJSON(DATA_SOURCE);
            
        } catch (err) {
            throw err;  // Lanzo el error para que lo reciba el un catch mas arriba con contexto: req, res, next.
        }        
        
        // Si no sucede ningun error, continuo con la logica...
        const product = products.find(product => product.id === Number(id));    // Filtra los productos comparando los id de cada uno con el id solicitado.
        return product;
    }
    
    static async update({ id, input }) {
        
        let products;
        try {
            // Lógica para actualizar parcialmente (ciertos campos) un producto (patch) y/o reemplazar un producto existente por otro nuevo (put).
            products = await readJSON(DATA_SOURCE);
            
        } catch (err) {
            throw err;  // Lanzo el error para que lo reciba el un catch mas arriba con contexto: req, res, next
        }
        
        // Si no sucede ningun error, continuo con la logica...
        const index = products.findIndex(prev => prev.id === Number(id));   // Busca la posición/indice del producto a modificar.

        /* Recorremos cada producto usando .map(); y "prev" representa **cada objeto producto del array** */
        const x = products.map(prev => {
            // Si el ID coincide con el producto que queremos actualizar
            if (prev.id === Number(id)) {

                return {
                    ...prev,   // Spread operator: copia todas las propiedades del objeto original
                    ...input   // Spread operator: sobrescribe solo las propiedades que vienen en "input"
                };
            }
            /* Si no coincide, devolvemos el objeto original sin cambios, y si coincide, devuelve el objeto con
            los parametros modificados */
            return prev;
        });

        // Retornamos el producto actualizado
        return x[index];
    }

    static async create({ input }) {
        
        let products;
        try {
            // Lógica para agregar un producto nuevo
            products = await readJSON(DATA_SOURCE);
            
        } catch (err) {
            throw err;  // Lanzo el error para que lo reciba el un catch mas arriba con contexto: req, res, next
        }

        // Si no sucede ningun error, un catch mas arriba con contexto: req, res, next con la logica...
        products.push(input); // .push() es para agregar al final del array.
        return products; 
    }

    static async delete({ id }) {
        
        let products;
        try {
            // Lógica para eliminar un producto
            products = await readJSON(DATA_SOURCE);
            
        } catch (err) {
            throw err;  // Lanzo el error para que lo reciba el un catch mas arriba con contexto: req, res, next
        }
        
        // Si no sucede ningun error, continuamos con la logica...       
        const index = products.findIndex(prev => prev.id === Number(id));    // Busca la posición/indice del producto a eliminar.
        products.splice(index, 1);     // Elimino el producto desde esa posición en la que esta hasta ahi mismo (1).

        return products;
    }

}
