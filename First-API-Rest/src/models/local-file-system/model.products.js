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
        // Lógica para obtener todos los productos
        const products = await readJSON(DATA_SOURCE);     // Leemos todos los productos desde el archivo JSON

        return products;    // Envio el "objeto js"
    }
    static async getById({ id }) {
        // Lógica para obtener un producto por ID
        const products = await readJSON(DATA_SOURCE);
        const product = products.find(product => product.id === Number(id));    // Filtra los productos comparando los id de cada uno con el id solicitado.
        console.log(product);
        return product;
    }
    
    static async update({ id, input }) {
        // Lógica para actualizar parcialmente (ciertos campos) un producto (patch) y/o reemplazar un producto existente por otro nuevo (put).
        //console.log(input);
        const products = await readJSON(DATA_SOURCE);
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
        // Lógica para agregar un producto nuevo
        const product = await readJSON(DATA_SOURCE);
        product.push(input); // .push() es para agregar al final del array.
        
        return product; 
    }

    static async delete({ id }) {
        // Lógica para eliminar un producto
        const products = await readJSON(DATA_SOURCE);
        const index = products.findIndex(prev => prev.id === Number(id));    // Busca la posición/indice del producto a eliminar.
        products.splice(index, 1);     // Elimino el producto desde esa posición en la que esta hasta ahi mismo (1).

        return products;
    }

}
