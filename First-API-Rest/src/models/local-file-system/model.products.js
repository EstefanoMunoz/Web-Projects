/**
 * Models - Logica de datos (Capa inferior a controllers)
 * - En "models" se programa el comó el sistema accede o recupera la información.
 * - Aqui es donde se programa el CRUD real: leer, escribir, actualizar, eliminar.
*/

import { randomUUID } from 'node:crypto';       // Para crear ids fuertes.
import { DATA_SOURCE } from "../../config.js";  // Hago un destructuring del fichero config.js
import { readFile } from 'node:fs/promises';

export class ProductModel {

    // Ya que todo lo de aqui son solo metodos, utilizare static por pertinencia. Razon: ... (la razon esta en como se usa el ProductModel en el controlador... Redactar una razon coherente y logica.)

    static async getAll() {    // Nota: Ya que la clase no requiere recibir un parametro al ser contruida la instancia, no necesito definir un constructor, por lo tanto, tampoco  requiero del "this." asi que no necesito definir fat arrays functions.
        // Lógica para traer datos (de archivo, BD, API, etc.)
        const data = await readFile(DATA_SOURCE, "utf8");
        return JSON.parse(data);    // Hago una serialización de "objeto js" a "JSON".
    }

    static async getById({ id }) {
        // Lógica para obtener un producto por ID
    }

    static async create({ input }) {
        // Lógica para agregar un producto nuevo
    }

    static async update({ id, input }) {
        // Lógica para actualizar un producto
    }

    static async delete({ id }) {
        // Lógica para eliminar un producto
    }
}
